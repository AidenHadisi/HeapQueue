import { Comperator } from "./comperator";
export class HeapQueue<QueueDataType> {
	private _queue: Array<QueueDataType>;
	private _comperator: Comperator<QueueDataType>;

	constructor(comperator: Comperator<QueueDataType>) {
		this._comperator = comperator;
		this._queue = [];
	}
	/**
	 * Add an item to priority queue
	 * @param item An item to add to the queue
	 * @param priority priority for the item. Defaults to 0
	 */
	public enqueue(element: QueueDataType) {
		this._queue.push(element);
		this.heapifyUp();
	}

	/**
	 * Remove and return the first item in queue line
	 * @returns an item from the queue
	 */
	public dequeue(): QueueDataType | undefined {
		if (!this.size) return;
		[this._queue[0], this._queue[this.size - 1]] = [
			this._queue[this.size - 1],
			this._queue[0],
		];
		var element = this._queue.pop();
		this.heapifyDown();
		return element;
	}

	/**
	 * Peak into items of queue
	 * @returns a copy of elem in top of the queue without popping the element
	 */
	public peak(): QueueDataType {
		return this._queue[0];
	}

	/**
	 * Removes all items in queue
	 */
	public clear(): void {
		this._queue = [];
	}

	get size(): number {
		return this._queue.length;
	}

	private heapifyUp() {
		var cur = this._queue.length - 1;
		var parent = this.parent(cur);
		while (
			parent >= 0 &&
			this._comperator(this._queue[parent], this._queue[cur]) > 0
		) {
			[this._queue[parent], this._queue[cur]] = [
				this._queue[cur],
				this._queue[parent],
			];
			cur = parent;
			parent = this.parent(cur);
		}
	}

	private heapifyDown() {
		var cur = 0;
		var topChild = this.topChild(cur);
		while (
			this.leftChild(cur) < this.size &&
			this._comperator(this._queue[cur], this._queue[topChild]) > 0
		) {
			[this._queue[cur], this._queue[topChild]] = [
				this._queue[topChild],
				this._queue[cur],
			];

			cur = topChild;
			topChild = this.topChild(cur);
		}
	}

	private parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	private leftChild(index: number): number {
		return 2 * index + 1;
	}

	private rightChild(index: number): number {
		return 2 * index + 2;
	}

	private topChild(index: number): number {
		let left = this.leftChild(index);
		let right = this.rightChild(index);
		if (
			right < this.size &&
			this._comperator(this._queue[left], this._queue[right]) > 0
		) {
			return right;
		}

		return left;
	}
}
