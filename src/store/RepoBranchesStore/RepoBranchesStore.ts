import apiEndpoints from "@config/api";
import {
  BranchesItemApi,
  BranchesItemModel,
  normalizeBranchesItem,
} from "@store/models/gitHub";
import rootStore from "@store/RootStore";
import log from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { HTTPMethod } from "../RootStore/ApiStore/types";
import { GetRepoBranchesParams, IRepoBranchesStore } from "./types";

type PrivateFields = "_list" | "_meta";

export default class RepoBranchesStore
  implements IRepoBranchesStore, ILocalStore
{
  private readonly _apiStore = rootStore.api;

  private _list: BranchesItemModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      branchesList: computed,
      meta: computed,
      getRepoBranches: action,
    });
  }

  get branchesList(): BranchesItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoBranches({
    owner,
    repo,
    ...params
  }: GetRepoBranchesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.repoBranches(owner, repo),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: params,
    };
    const response = await this._apiStore.request<BranchesItemApi[]>(
      sendParams
    );

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._list = response.data.map(normalizeBranchesItem);
      } catch (e) {
        log(e);
        this._meta = Meta.error;
        this._list = [];
      }
    });
  }

  destroy(): void {}
}
