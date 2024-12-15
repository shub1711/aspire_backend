import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const fetchRepositoryDetails = async (owner: string, repo: string) => {
  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo
    });

    return {
      stars: data.stargazers_count,
      forks: data.forks_count
    };
  } catch (error) {
    console.error(
      `Failed to fetch repository details for ${owner}/${repo}:`,
      error
    );
    throw new Error("Failed to fetch repository details.");
  }
};

export const fetchReleases = async (owner: string, repo: string) => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner,
    repo
  });

  return data.map((release: any) => ({
    version: release.tag_name,
    publishedAt: release.published_at
      ? new Date(release.published_at).toISOString() // Ensure proper ISO format
      : null,
    releaseNotes: release.body
  }));
};
