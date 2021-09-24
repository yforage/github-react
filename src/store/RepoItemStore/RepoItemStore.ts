import apiEndpoints from "@config/api";
import {
  normalizeRepoInfo,
  RepoInfoApi,
  RepoInfoModel,
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
import { GetRepoInfoParams, IRepoItemStore } from "./types";

type PrivateFields = "_info" | "_meta";

export default class RepoItemStore implements IRepoItemStore, ILocalStore {
  private readonly _apiStore = rootStore.api;

  private _info: RepoInfoModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _info: observable.ref,
      _meta: observable,
      info: computed,
      meta: computed,
      getRepoInfo: action,
    });
  }

  get info() {
    return this._info;
  }

  get meta() {
    return this._meta;
  }

  async getRepoInfo({ owner, name }: GetRepoInfoParams): Promise<void> {
    this._meta = Meta.loading;
    this._info = null;

    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.repoInfo(owner, name),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: "",
    };
    const response = await this._apiStore.request<RepoInfoApi>(sendParams);

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;
        this._info = normalizeRepoInfo(response.data);
        return;
      } catch (e) {
        log(e);
        this._meta = Meta.error;
        this._info = null;
      }
    });
  }

  destroy(): void {}
}
