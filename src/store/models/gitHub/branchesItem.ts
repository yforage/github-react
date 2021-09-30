export type BranchesItemApi = {
  name: string;
};

export type BranchesItemModel = {
  name: string;
};

export const normalizeBranchesItem = (
  from: BranchesItemApi
): BranchesItemModel => ({
  name: from.name,
});
