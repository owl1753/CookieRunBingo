export interface Result {
    expect: number;
    index: number;
}

export default class Bingo {
    private _state: number;
    private readonly _bingoSize: number;
    private _count: number;
    private _index: number;

    private readonly _rowMasks: number[];
    private readonly _colMasks: number[];
    private readonly _diagonalMask1: number;
    private readonly _diagonalMask2: number;

    private readonly _dp: Map<number, number>;

    private _pCounts: number[];

    constructor(state: number = 0, count: number = 0, bingoSize: number = 5) {
        this._state = state;
        this._count = count;
        this._bingoSize = bingoSize;

        this._rowMasks = this.generateRowMasks();
        this._colMasks = this.generateColMasks();
        this._diagonalMask1 = this.generateDiagonalMask1();
        this._diagonalMask2 = this.generateDiagonalMask2();

        this._dp = new Map<number, number>();

        this._pCounts = Array.from({ length: 6 }, () => 0);

        this._index = 0;
    }

    private generateRowMasks(): number[] {
        const masks: number[] = [];
        for (let i = 0; i < this._bingoSize; i++) {
            let mask = 0;
            for (let j = 0; j < this._bingoSize; j++) {
                mask |= 1 << (i * this._bingoSize + j);
            }
            masks.push(mask);
        }
        return masks;
    }

    private generateColMasks(): number[] {
        const masks: number[] = [];
        for (let i = 0; i < this._bingoSize; i++) {
            let mask = 0;
            for (let j = 0; j < this._bingoSize; j++) {
                mask |= 1 << (j * this._bingoSize + i);
            }
            masks.push(mask);
        }
        return masks;
    }

    private generateDiagonalMask1(): number {
        let mask = 0;
        for (let i = 0; i < this._bingoSize; i++) {
            mask |= 1 << (i * this._bingoSize + i);
        }
        return mask;
    }

    private generateDiagonalMask2(): number {
        let mask = 0;
        for (let i = 0; i < this._bingoSize; i++) {
            mask |= 1 << (i * this._bingoSize + (this._bingoSize - 1 - i));
        }
        return mask;
    }

    get index(): number {
        return this._index;
    }

    get state(): number {
        return this._state;
    }

    get pCounts(): number[] {
        return this._pCounts;
    }

    get count(): number {
        return this._count;
    }

    get bingoCount(): number {
        let count = 0;

        // 행 검사
        for (const rowMask of this._rowMasks) {
            if ((this._state & rowMask) === rowMask) {
                count++;
            }
        }

        // 열 검사
        for (const colMask of this._colMasks) {
            if ((this._state & colMask) === colMask) {
                count++;
            }
        }

        // 대각선 검사
        if ((this._state & this._diagonalMask1) === this._diagonalMask1) {
            count++;
        }
        if ((this._state & this._diagonalMask2) === this._diagonalMask2) {
            count++;
        }

        return count;
    }

    get cells(): boolean[] {
        const cells: boolean[] = [];
        for (let i = 0; i < this._bingoSize * this._bingoSize; i++) {
            cells.push((this._state & (1 << i)) !== 0);
        }
        return cells;
    }

    public init(): void {
        this._state = 0;
        this._count = 0;
    }

    public drawCell(index: number): void {
        this._state |= 1 << index;
        this._count++;
    }

    public clearCell(index: number): void {
        this._state &= ~(1 << index);
        this._count--;
    }

    public solve(): number {
        if (this._dp.has(this._state)) {
            return this._dp.get(this._state)!;
        }

        if (this._count >= 16) {
            this._pCounts[this.bingoCount]++;
            return this.bingoCount;
        }

        let sum = 0;
        let maxValue = 0;
        let maxIndex = 0;
        let count = 0;

        for (let i = 0; i < this._bingoSize * this._bingoSize; i++) {
            if ((this._state & (1 << i)) >> i) continue;
            this.drawCell(i);
            const temp = this.solve();
            count++;
            if (maxValue < temp) {
                maxValue = temp;
                maxIndex = i;
            }
            sum += temp;
            this.clearCell(i);
        }

        const result = this._count % 2 ? (sum / count) : maxValue;
        this._index = maxIndex;

        this._dp.set(this._state, result);
        return result!;
    }
}
