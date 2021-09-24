import apiEndpoints from "@config/api";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import log from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { HTTPMethod } from "../RootStore/ApiStore/types";
import { GetRepoListParams, IReposListStore } from "./types";

type PrivateFields = "_list" | "_meta" | "_input";

export default class ReposListStore implements IReposListStore, ILocalStore {
  private readonly _apiStore = rootStore.api;

  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _input: string = "";

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _input: observable,
      list: computed,
      meta: computed,
      getReposList: action,
      handleInputChange: action.bound,
      getNewReposListPart: action.bound,
    });
  }

  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get input(): string {
    return this._input;
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this._input = e.target.value;
  }

  getNewReposListPart() {
    rootStore.query.setParam("search", this._input);
    rootStore.query.setParam("page", "1");
  }

  getReposListPart() {
    const page = rootStore.query.getParam("page");
    if (page) {
      const nextPage = (Number(page) + 1).toString();
      rootStore.query.setParam("page", nextPage);
    }
  }

  async getReposList({ orgName, ...params }: GetRepoListParams): Promise<void> {
    this._meta = Meta.loading;
    if (!params.page || params.page === 1) {
      this._list = getInitialCollectionModel();
    }

    const sendParams = {
      method: HTTPMethod.GET,
      endpoint: apiEndpoints.orgRepos(orgName),
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: params,
    };
    const response = await this._apiStore.request<RepoItemApi[]>(sendParams);

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        const list = [
          ...this._list.order.map((id) => this._list.entities[id]),
          ...response.data.map((item: RepoItemApi) => normalizeRepoItem(item)),
        ];
        this._list = normalizeCollection(list, (repoItem) => repoItem.id);
        return;
      } catch (e) {
        log(e);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    (page) => {
      const orgName = rootStore.query.getParam("search");
      if (typeof orgName === "string") {
        if (this._list.order.length === 0) {
          this.getReposList({ orgName, per_page: 6 * Number(page) });
        } else {
          this.getReposList({ orgName, page: Number(page), per_page: 6 });
        }
      }
    }
  );

  destroy(): void {}
}
