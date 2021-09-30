import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryStore {
  private _params: qs.ParsedQs = {};
  private _history: any = null;
  private _location: any = null;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _params: observable,
      setParam: action,
      setHistory: action,
      syncQueryParams: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  syncQueryParams() {
    const newSearch = this._location.search.startsWith("?")
      ? this._location.search.slice(1)
      : this._location.search;
    this._params = qs.parse(newSearch);
  }

  setHistory(history: any, location: any): void {
    this._history = history;
    this._location = location;
  }

  setParam(key: string, value: string) {
    const nextParams = { ...this._params, [key]: value };
    const nextSearch = qs.stringify(nextParams);
    if (this._history) {
      this._history.replace({
        ...this._location,
        search: nextSearch,
      });
    }
    this._params = nextParams;
  }
}
