/**
 * Lifepath tables and traversal utilities.
 */

class Lifepath {
    // affectation = ""
    // cultural_origins = ""
    // personality = ""
    // clothing_style = ""
    // value_most = ""
    // feelings_about_people = ""
    // most_valued_person = ""
    // most_valued_possession = ""
    // family_background = ""
    // childhood_environment = ""
    // family_crisis = ""
    // life_goals = ""
    // friends: string[] = []
    // love_affairs: string[] = []
    // enemies: {
    //     who: string,
    //     cause: string,
    //     what_can_they_throw: string,
    //     what_happens: string
    // }[] = []
    // role_specific: string[] = []

    path: LifepathRow[] = [];
    starting_table: LifepathTable | undefined = undefined;

    walkPath() {
        if (!this.starting_table) {
            throw new Error("No starting table defined");
        }
        this.starting_table.walkPath(this);
    }
    pushRow(row: LifepathRow) {
        this.path.push(row);
    }

    logPath() {
        console.log(this)
        this.path.forEach((row) => {
            console.log(row + "")
        });
    }
    printPath() {
        console.info("printPath not implemented.")
    }
    setStartingTable(table: LifepathTable) {
        this.starting_table = table;
    }
    // constructor({ starting_table }: { starting_table?: LifepathTable } | undefined) {
    //     this.starting_table = starting_table;
    // }
}



class LifepathTable {
    start = false;
    end = false;
    rows: LifepathRow[] = [];
    name = "";
    next_table: LifepathTable | undefined = undefined;
    repeat: number | string = 1;
    description: string = "";

    constructor({ name, start, end, repeat = 1, rows, description }: { name: string, start?: boolean, end?: boolean, repeat?: number | string, rows?: LifepathRow[] | LifepathRow_Object[], description?: string }) {
        this.name = name;
        this.start = start || false;
        this.end = end || false;
        this.description = description || "";
        if (repeat === "1d10-7") {
            this.repeat = repeat as string; //Math.floor(Math.random() * 10) - 7;
        }
        else {
            this.repeat = repeat as number;
        }
        if (rows) {
            this.addRows(rows);
        }
    }
    addRow(row: LifepathRow) {

        row.table = this;
        this.rows.push(row);
    }
    addRows(rows: LifepathRow[] | LifepathRow_Object[]) {
        rows.forEach((row) => {
            try {
                this.addRow(new LifepathRow({ ...row }));
            }
            catch (e) {
                console.warn("Could not add lifepath row.", e)
            }
        });
    }
    setNextTable(table: LifepathTable) {
        this.next_table = table;
    }
    getRandomRow() {
        return this.rows[Math.floor(Math.random() * this.rows.length)];
    }
    walkPath(path: Lifepath) {
        let repeat = 1;
        if (this.repeat === "1d10-7") {
            // repeat = Math.floor(Math.random() * 10) - 7;
            repeat = Math.floor(Math.random() * 4)
        }
        else {
            repeat = this.repeat as number;
        }

        for (let i = 0; i < repeat; i++) {
            let row = this.getRandomRow();
            row.walkPath(path);
        }
        if (this.next_table) {
            this.next_table.walkPath(path);
        }
    }


}

interface LifepathRow_Object {
    table?: LifepathTable;
    value: string;
    description?: string;
    next_table?: LifepathTable | undefined;
}

class LifepathRow {
    table?: LifepathTable;
    value: string = "";
    description?: string = "";
    next_table?: LifepathTable | undefined = undefined;

    constructor({ table, value, description, next_table }: { table?: LifepathTable, value: string, description?: string, next_table?: LifepathTable }) {
        if (!value) {
            throw new Error("Value is required");
        }
        this.value = value;
        this.table = table;
        this.description = description || this.description;
        this.next_table = next_table || undefined;
    }

    walkPath(path: Lifepath) {
        path.pushRow(new LifepathRow({ ...this }));
        if (this.next_table) {
            this.next_table.walkPath(path);
        }
    }
    toString() {
        return `${this.table?.name} : ${this.value} : ${this.description}`;
    }
}






export { Lifepath, LifepathTable, LifepathRow }
export type { LifepathRow_Object }