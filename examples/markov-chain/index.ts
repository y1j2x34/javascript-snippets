class MarkovChain {
    private lookupTable: Record<string, string[]> = {};
    constructor(private order: number, private text: string) {}

    train() {
        for (let i = 0; i <= this.text.length - this.order; i++) {
            const gram = this.text.slice(i, i + this.order);
            const nextChar = this.text.charAt(i + this.order);
            if (!this.lookupTable[gram]) {
                this.lookupTable[gram] = [];
            }
            this.lookupTable[gram].push(nextChar);
        }
    }

    generateText(length: number) {
        const startingIndex = Math.floor(Math.random() * (this.text.length - this.order));
        let currentGram = this.text.slice(startingIndex, startingIndex + this.order);
        let result = currentGram;
        for (let i = 0; i < length - this.order; i++) {
            const possibilities = this.lookupTable[currentGram];
            if (!possibilities || possibilities.length === 0) {
                break;
            }
            const nextChar = possibilities[Math.floor(Math.random() * possibilities.length)];
            result += nextChar;
            currentGram = result.slice(result.length - this.order, result.length);
        }
        return result;
    }
}

export function main() {
    // Example usage
    const text = `「马尔可夫模型」是指基于马尔可夫性质的模型，其假设一个给定过程的未来状态仅取决于当前状态。根据系统状态是否完全可被观测以及系统是自动的还是受控的，可以将常见的马尔可夫模型分成四种：马尔可夫链、隐马尔可夫模型（HMM）、马尔可夫决策过程（MDP）和部分可观测马尔可夫决策过程（POMDP），具体可见下表。`;
    const order = 2; // Adjust the order as needed
    const chain = new MarkovChain(order, text);
    chain.train();
    const generatedText = chain.generateText(100); // Generate 100 characters of text
    console.log(generatedText);
}
