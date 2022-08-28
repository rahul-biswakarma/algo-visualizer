import { store } from "/redux/store";
import { MakeDelay } from "/utils";
import { batch } from "react-redux";
import {
  setArray,
  incrementComparisons,
  incrementSwaps,
} from "/redux/reducers/sortingSlice";

export async function BubbleSort() {
  let array = store.getState().sorting.array.slice();
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (store.getState().sorting.paused) return;
      await MakeDelay(store.getState().sorting.speed);
      store.dispatch(incrementComparisons());
      array = store.getState().sorting.array.slice();
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        store.dispatch(incrementSwaps());
      }
      store.dispatch(setArray(array));
    }
  }
}

export async function SelectionSort() {
  let array = store.getState().sorting.array.slice();
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (store.getState().sorting.paused) return;
      await MakeDelay(store.getState().sorting.speed);
      store.dispatch(incrementComparisons());

      if (array[j] < array[min]) {
        min = j;
      }
    }
    array = store.getState().sorting.array.slice();
    if (min !== i) {
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      store.dispatch(incrementSwaps());
    }
    store.dispatch(setArray(array));
  }
}

export async function InsertionSort() {
  let array = store.getState().sorting.array.slice();
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      if (store.getState().sorting.paused) return;
      await MakeDelay(store.getState().sorting.speed);

      array = store.getState().sorting.array.slice();
      let temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      batch(() => {
        store.dispatch(incrementComparisons());
        store.dispatch(incrementSwaps());
        store.dispatch(setArray(array));
      });
      j--;
    }
  }
}
