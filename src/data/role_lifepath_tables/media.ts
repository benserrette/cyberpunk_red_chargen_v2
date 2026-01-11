/**
 * Media role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build media-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Media are You?",
    rows: [
        { value: "Blogger" },
        { value: "Writer (Books)" },
        { value: "Videographer" },
        { value: "Documentarian" },
        { value: "Investigative Reporter" },
        { value: "Street Scribe" },
    ],
});

const distribution = new LifepathTable({
    name: "How Does Your Work Reach the Public?",
    rows: [
        { value: "Monthly magazine" },
        { value: "Blog" },
        { value: "Mainstream vid feed" },
        { value: "News channel" },
        { value: "\"Book\" sales" },
        { value: "Screamsheets" },
    ],
});
starting_table.setNextTable(distribution);

const ethics = new LifepathTable({
    name: "How Ethical are You?",
    rows: [
        { value: "Fair, honest reporting, strong ethical practices. You only report the verifiable truth." },
        { value: "Fair and honest reporting, but willing to go on hearsay and rumor if that's what it takes." },
        { value: "Will occasionally slip and do unethical things, but it's rare. You have some standards." },
        { value: "Willing to bend any rules to get the bad guys. But only the bad guys." },
        { value: "Ruthless and determined to make it into the headlines. You are a muckraker." },
        { value: "Totally corrupt. You take bribes, engage in illegal, unethical reporting all the time. Your pen is for hire to the highest bidder." },
    ],
});
distribution.setNextTable(ethics);

const story_types = new LifepathTable({
    name: "What Types of Stories Do You Want to Tell?",
    rows: [
        { value: "Political intrigue" },
        { value: "Ecological impact" },
        { value: "Celebrity news" },
        { value: "Corporate takedowns" },
        { value: "Editorials" },
        { value: "Propaganda" },
    ],
});
ethics.setNextTable(story_types);

export default starting_table;
