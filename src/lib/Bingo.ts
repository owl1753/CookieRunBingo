export default class Bingo {
    private _state: number;
    private readonly _bingoSize: number;
    private _count: number;

    private readonly _rowMasks: number[];
    private readonly _colMasks: number[];
    private readonly _diagonalMask1: number;
    private readonly _diagonalMask2: number;

    private _dp: ({ expect: number, index: number } | null)[];

    constructor() {
        this._state = 0;
        this._count = 0;
        this._bingoSize = 5;

        this._rowMasks = this.generateRowMasks();
        this._colMasks = this.generateColMasks();
        this._diagonalMask1 = this.generateDiagonalMask1();
        this._diagonalMask2 = this.generateDiagonalMask2();

        this._dp = Array(1 << (this._bingoSize * this._bingoSize)).fill(null);
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

    get state(): number {
        return this._state;
    }

    get bingoSize(): number {
        return this._bingoSize;
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

    public drawCell(index: number): void {
        this._state |= 1 << index;
        this._count++;
    }

    public clearCell(index: number): void {
        this._state &= ~(1 << index);
        this._count--;
    }

    public solve(): { expect: number, index: number } {
        if (this._dp[this._state] !== null) return this._dp[this._state];

        return
    }
}