import {
  getAllRepositories,
  addRepository,
  markReleaseAsSeen,
  refreshRepositories,
  getRepositoryDetails,
} from "../../services/repositoryService";

export const repositoryResolver = {
  Query: {
    repositories: async () => {
      return getAllRepositories();
    },
    repositoryDetails: async (_: any, { name }: { name: string }) => {
      return getRepositoryDetails(name);
    },
  },
  Mutation: {
    addRepository: async (_: any, { name }: { name: string }) => {
      return addRepository(name);
    },
    markReleaseAsSeen: async (_: any, { releaseId }: { releaseId: number }) => {
      return markReleaseAsSeen(releaseId);
    },
    refreshRepositories: async () => {
      return refreshRepositories();
    },
  },
};
