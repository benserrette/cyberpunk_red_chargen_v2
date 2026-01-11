/**
 * Rockerboy role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build rockerboy-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Rockerboy are You?",
    rows: [
        { value: "Musician" },
        { value: "Slam Poet" },
        { value: "Street Artist" },
        { value: "Performance Artist" },
        { value: "Comedian" },
        { value: "Orator" },
        { value: "Politico" },
        { value: "Rap Artist" },
        { value: "DJ" },
        { value: "Idoru" },
    ],
});

const act = new LifepathTable({
    name: "Are You in a Group or a Solo Act?",
    rows: [
        { value: "Group" },
        { value: "Solo" },
    ],
});
starting_table.setNextTable(act);

const group_performance = new LifepathTable({
    name: "Where Do You Perform?",
    rows: [
        { value: "Alternative Cafes" },
        { value: "Private Clubs" },
        { value: "Seedy Dive Bars" },
        { value: "Guerrilla Performances" },
        { value: "Nightclubs Around the City" },
        { value: "On the Data Pool" },
    ],
});

const solo_history = new LifepathTable({
    name: "Were You Once in a Group?",
    rows: [
        { value: "Yes" },
        { value: "No" },
    ],
});
act.rows[0].setNextTable(group_performance);
act.rows[1].setNextTable(solo_history);

const why_left = new LifepathTable({
    name: "Why Did You Leave?",
    rows: [
        { value: "You were a jerk and the rest of the group voted you out." },
        { value: "You got caught sleeping around with another member's mainline." },
        { value: "The rest of the group was killed in a tragic \"accident.\"" },
        { value: "The rest of the group was murdered or otherwise broken up by external enemies." },
        { value: "The group broke up over \"creative differences.\"" },
        { value: "You decided to go solo." },
    ],
});
solo_history.rows[0].setNextTable(why_left);

const gunning = new LifepathTable({
    name: "Who's Gunning for You/Your Group?",
    rows: [
        { value: "Old group member who thinks you did them dirty." },
        { value: "Rival group or artist trying to steal market share." },
        { value: "Corporate enemies who don't like your message." },
        { value: "Critic or other \"influencer\" trying to bring you down." },
        { value: "Older media star who feels threatened by your rising fame." },
        { value: "Romantic interest or media figure who wants revenge for personal reasons." },
    ],
});
group_performance.setNextTable(gunning);
solo_history.setNextTable(gunning);
why_left.setNextTable(gunning);

export default starting_table;
