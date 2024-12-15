import prisma from "../prisma/prismaClient";
import { fetchReleases, fetchRepositoryDetails } from "./githubService";

export const getAllRepositories = async () => {
  return prisma.repository.findMany({
    include: { latestRelease: true },
  });
};

export const addRepository = async (name: string) => {
  validateRepositoryName(name);
  const [owner, repo] = name.split("/");
  const releases = await fetchReleases(owner, repo);

  const latestRelease = releases[0];
  const repository = await prisma.repository.create({
    data: {
      name,
      latestRelease: latestRelease
        ? {
            create: {
              version: latestRelease.version,
              publishedAt: latestRelease.publishedAt
                ? new Date(latestRelease.publishedAt)
                : new Date(),
              releaseNotes: latestRelease.releaseNotes || "No notes available",
            },
          }
        : undefined,
    },
  });

  return repository;
};

export const markReleaseAsSeen = async (releaseId: number | string) => {
  const id =
    typeof releaseId === "string" ? parseInt(releaseId, 10) : releaseId;

  if (isNaN(id)) {
    throw new Error("Invalid releaseId: Must be a number or numeric string");
  }

  try {
    const result = await prisma.release.update({
      where: { id },
      data: { seen: true },
    });

    return !!result; // Return true if the update was successful
  } catch (error) {
    console.error("Error marking release as seen:", error);
    throw new Error(`Failed to mark release with ID ${id} as seen`);
  }
};


export const refreshRepositories = async () => {
  const repositories = await prisma.repository.findMany();

  const updatePromises = repositories.map(async (repo) => {
    const [owner, name] = repo.name.split("/");
    const releases = await fetchReleases(owner, name);

    if (releases.length > 0) {
      const latestRelease = releases[0];
      await prisma.release.upsert({
        where: { repositoryId: repo.id },
        update: {
          version: latestRelease.version,
          publishedAt: latestRelease.publishedAt
            ? new Date(latestRelease.publishedAt)
            : new Date(),
          releaseNotes: latestRelease.releaseNotes || "No notes available",
          seen: false,
        },
        create: {
          repositoryId: repo.id,
          version: latestRelease.version,
          publishedAt: latestRelease.publishedAt
            ? new Date(latestRelease.publishedAt)
            : new Date(),
          releaseNotes: latestRelease.releaseNotes || "No notes available",
        },
      });
    }
  });

  // Wait for all updates to finish before returning
  await Promise.all(updatePromises);

  return true;
};


export const getRepositoryDetails = async (name: string) => {
  validateRepositoryName(name);
  const [owner, repo] = name.split("/");

  // Fetch repository details from GitHub API
  const { stars, forks } = await fetchRepositoryDetails(owner, repo);
  const releases = await fetchReleases(owner, repo);

  return {
    name,
    stars,
    forks,
    latestRelease: releases[0] || null,
  };
};

export const validateRepositoryName = (name: string) => {
  const isValid = /^[^/]+\/[^/]+$/.test(name);
  if (!isValid) {
    throw new Error(
      "Invalid repository name. Ensure it follows the format 'owner/repo'."
    );
  }
};
