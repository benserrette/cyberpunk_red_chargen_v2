/**
 * Lifepath tables and traversal utilities.
 *
 * Lifepath tables define narrative prompts for a character. The Character
 * class seeds a Lifepath instance with a starting table, then walks the graph
 * to build a row-by-row story that UI components can render.
 */

/**
 * Holds a generated lifepath and the starting table used for traversal.
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

    /**
     * Walk the configured lifepath tables and populate `path`.
     */
    walkPath() {
        if (!this.starting_table) {
            throw new Error("No starting table defined");
        }
        this.starting_table.walkPath(this);
    }
    /**
     * Append a row to the lifepath sequence.
     */
    pushRow(row: LifepathRow) {
        this.path.push(row);
    }

    /**
     * Log the current lifepath to the console for debugging.
     */
    logPath() {
        console.log(this)
        this.path.forEach((row) => {
            console.log(row + "")
        });
    }
    /**
     * Placeholder for future formatted lifepath rendering.
     */
    printPath() {
        console.info("printPath not implemented.")
    }
    /**
     * Define the starting table used when `walkPath` is called.
     */
    setStartingTable(table: LifepathTable) {
        this.starting_table = table;
    }
    // constructor({ starting_table }: { starting_table?: LifepathTable } | undefined) {
    //     this.starting_table = starting_table;
    // }
}



/**
 * A lifepath table containing rows and links to subsequent tables.
 */
class LifepathTable {
    start = false;
    end = false;
    rows: LifepathRow[] = [];
    name = "";
    next_table: LifepathTable | undefined = undefined;
    repeat: number | string = 1;
    description: string = "";

    /**
     * Create a lifepath table with optional rows and traversal rules.
     */
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
    /**
     * Add a row and back-link it to this table.
     */
    addRow(row: LifepathRow) {
        row.table = this;
        this.rows.push(row);
    }
    /**
     * Add multiple rows, converting plain objects into LifepathRow instances.
     */
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
    /**
     * Define the next table to visit after this one completes.
     */
    setNextTable(table: LifepathTable) {
        this.next_table = table;
    }
    /**
     * Return a random row from this table.
     */
    getRandomRow() {
        return this.rows[Math.floor(Math.random() * this.rows.length)];
    }
    /**
     * Walk the table, pushing row(s) onto the provided Lifepath instance.
     */
    walkPath(path: Lifepath, repeatOverrides: Record<string, number[]> = {}) {
        let repeat = 1;
        const overrideQueue = repeatOverrides[this.name];
        if (overrideQueue && overrideQueue.length > 0) {
            repeat = overrideQueue.shift() ?? 1;
        }
        else if (this.repeat === "1d10-7") {
            // repeat = Math.floor(Math.random() * 10) - 7;
            repeat = Math.floor(Math.random() * 4)
        }
        else {
            repeat = this.repeat as number;
        }

        for (let i = 0; i < repeat; i++) {
            let row = this.getRandomRow();
            row.walkPath(path);
            if (row.next_table) {
                if (row.next_table_repeat !== undefined) {
                    repeatOverrides[row.next_table.name] ??= [];
                    repeatOverrides[row.next_table.name].push(row.next_table_repeat);
                }
                row.next_table.walkPath(path, repeatOverrides);
            }
        }
        if (this.next_table) {
            this.next_table.walkPath(path, repeatOverrides);
        }
    }


}

/**
 * Plain-object representation for lifepath rows in data tables.
 */
interface LifepathRow_Object {
    table?: LifepathTable;
    value: string;
    description?: string;
    next_table?: LifepathTable | undefined;
    next_table_repeat?: number;
}

/**
 * Represents a single selection in a lifepath table.
 */
class LifepathRow {
    table?: LifepathTable;
    value: string = "";
    description?: string = "";
    next_table?: LifepathTable | undefined = undefined;
    next_table_repeat?: number = undefined;

    /**
     * Create a row, optionally linking to a follow-on table.
     */
    constructor({ table, value, description, next_table, next_table_repeat }: { table?: LifepathTable, value: string, description?: string, next_table?: LifepathTable, next_table_repeat?: number }) {
        if (!value) {
            throw new Error("Value is required");
        }
        this.value = value;
        this.table = table;
        this.description = description || this.description;
        this.next_table = next_table || undefined;
        this.next_table_repeat = next_table_repeat;
    }

    /**
     * Add this row to the path and continue traversal if configured.
     */
    walkPath(path: Lifepath) {
        path.pushRow(new LifepathRow({ ...this }));
    }

    /**
     * Define the next table to visit after this row is selected.
     */
    setNextTable(table: LifepathTable) {
        this.next_table = table;
    }
    /**
     * Format the row for logging and debugging.
     */
    toString() {
        return `${this.table?.name} : ${this.value} : ${this.description}`;
    }
}






export { Lifepath, LifepathTable, LifepathRow }
export type { LifepathRow_Object }
