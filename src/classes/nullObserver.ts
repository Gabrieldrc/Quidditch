import AbstractObserver from "../interfaces/abstractObserverInterface";

export default class NullObserver implements AbstractObserver{
  update(Character: any) {}
}