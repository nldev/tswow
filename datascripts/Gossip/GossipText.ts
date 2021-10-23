/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { WrappedLoc } from "wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { npc_textRow } from "wotlkdata/sql/types/npc_text";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Gossip } from "./Gossip";

function getNpcText(id: number) {
    let text = SQL.npc_text.find({ID: id});
    if(text===undefined) {
        text = SQL.npc_text.add(Ids.NPCText.id())
            .BroadcastTextID0.set(0)
            .BroadcastTextID1.set(0)
            .BroadcastTextID2.set(0)
            .BroadcastTextID3.set(0)
            .BroadcastTextID4.set(0)
            .BroadcastTextID5.set(0)
            .BroadcastTextID6.set(0)
            .BroadcastTextID7.set(0)
    }
    return text;
}

function getNpcLocaleText(id: number, loc: Language) {
    let text = SQL.npc_text_locale.find({ID: id, Locale: loc});
    if(text===undefined) {
        text = SQL.npc_text_locale.add(Ids.NPCText.id(), loc);
    }
    return text;
}

function maleText(owner: GossipTextArray, index: number, loc?: Language) {
    if(!loc) {
        const text = owner.row;
        switch(index) {
            case 0: return text.text0_0;
            case 1: return text.text1_0;
            case 2: return text.text2_0;
            case 3: return text.text3_0;
            case 4: return text.text4_0;
            case 5: return text.text5_0;
            case 6: return text.text6_0;
            case 7: return text.text7_0;
            default: throw new Error(`Internal error: Invalid maleText index: ${index} (max is 7)`)
        }
    } else {
        const text = getNpcLocaleText(owner.row.ID.get(), loc);
        switch(index) {
            case 0: return text.Text0_0;
            case 1: return text.Text1_0;
            case 2: return text.Text2_0;
            case 3: return text.Text3_0;
            case 4: return text.Text4_0;
            case 5: return text.Text5_0;
            case 6: return text.Text6_0;
            case 7: return text.Text7_0;
            default: throw new Error(`Internal error: Invalid maleText index: (${index} (max is 7)`)
        }
    }
}

function femaleText(owner: GossipTextArray, index: number, loc?: Language) {
    if(!loc) {
        const text = owner.row;
        switch(index) {
            case 0: return text.text0_1;
            case 1: return text.text1_1;
            case 2: return text.text2_1;
            case 3: return text.text3_1;
            case 4: return text.text4_1;
            case 5: return text.text5_1;
            case 6: return text.text6_1;
            case 7: return text.text7_1;
            default: throw new Error(`Internal error: Invalid femaleText index: ${index} (max is 7)`)
        }
    } else {
        const text = getNpcLocaleText(owner.row.ID.get(), loc);
        switch(index) {
            case 0: return text.Text0_1;
            case 1: return text.Text1_1;
            case 2: return text.Text2_1;
            case 3: return text.Text3_1;
            case 4: return text.Text4_1;
            case 5: return text.Text5_1;
            case 6: return text.Text6_1;
            case 7: return text.Text7_1;
            default: throw new Error(`Internal error: Invalid femaleText index: (${index} (max is 7)`)
        }
    }
}

function lang(owner: GossipTextArray, index: number) {
    const text = owner.row;
    switch(index) {
        case 0: return text.lang0;
        case 1: return text.lang1;
        case 2: return text.lang2;
        case 3: return text.lang3;
        case 4: return text.lang4;
        case 5: return text.lang5;
        case 6: return text.lang6;
        case 7: return text.lang7;
        default: throw new Error(`Internal error: Invalid femaleText index: ${index} (max is 7)`)
    }
}

function probability(owner: GossipTextArray, index: number) {
    const text = owner.row;
    switch(index) {
        case 0: return text.Probability0;
        case 1: return text.Probability1;
        case 2: return text.Probability2;
        case 3: return text.Probability3;
        case 4: return text.Probability4;
        case 5: return text.Probability5;
        case 6: return text.Probability6;
        case 7: return text.Probability7;
        default: throw new Error(`Internal error: Invalid probability index: ${index} (max is 7)`)
    }
}

function broadcastID(owner: GossipTextArray, index: number) {
    const text = owner.row;
    switch(index) {
        case 0: return text.BroadcastTextID0;
        case 1: return text.BroadcastTextID1;
        case 2: return text.BroadcastTextID2;
        case 3: return text.BroadcastTextID3;
        case 4: return text.BroadcastTextID4;
        case 5: return text.BroadcastTextID5;
        case 6: return text.BroadcastTextID6;
        case 7: return text.BroadcastTextID7;
        default: throw new Error(`Internal error: Invalid emote index: ${index} (max is 7)`)
    }
}

function emote(owner: GossipTextArray, index: number) {
    const text = owner.row;
    switch(index) {
        case 0: return text.Emote0_0;
        case 1: return text.Emote1_0;
        case 2: return text.Emote2_0;
        case 3: return text.Emote3_0;
        case 4: return text.Emote4_0;
        case 5: return text.Emote5_0;
        case 6: return text.Emote6_0;
        case 7: return text.Emote7_0;
        default: throw new Error(`Internal error: Invalid emote index: ${index} (max is 7)`)
    }
}

function emoteDelay(owner: GossipTextArray, index: number) {
    const text = owner.row;
    switch(index) {
        case 0: return text.EmoteDelay0_0;
        case 1: return text.EmoteDelay1_0;
        case 2: return text.EmoteDelay2_0;
        case 3: return text.EmoteDelay3_0;
        case 4: return text.EmoteDelay4_0;
        case 5: return text.EmoteDelay5_0;
        case 6: return text.EmoteDelay6_0;
        case 7: return text.EmoteDelay7_0;
        default: throw new Error(`Internal error: Invalid emoteDelay index: ${index} (max is 7)`)
    }
}

export class GossipText extends SQLLocSystem<GossipTextEntry> {
    protected index: number;
    protected isFemale: boolean;
    protected root: GossipTextArray;
    constructor(owner: GossipTextEntry, root: GossipTextArray, index: number, isFemale: boolean) {
        super(owner);
        this.index = index;
        this.isFemale = isFemale;
        this.root = root;
    }

    protected getMain(): Cell<string, any> {
        return this.isFemale ? femaleText(this.root, this.index) : maleText(this.root, this.index);
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return this.isFemale ? femaleText(this.root, this.index, loc) : maleText(this.root, this.index, loc);
    }
}

export class GossipTextEntry extends ArrayEntry<Gossip> {
    protected array: GossipTextArray;

    constructor(gossip: Gossip, array: GossipTextArray, index: number) {
        super(gossip,index);
        this.array = array;
    }

    clear() {
        this.Probability.set(0);
        this.MaleText.clear();
        this.FemaleText.clear();
        this.Emote.set(0);
        this.EmoteDelay.set(0);
        this.Probability.set(0);
        this.Broadcast.set(0);
        return this;
    }
    isClear(): boolean {
        return this.Probability.get() === 0;
    }

    get MaleText() : WrappedLoc<this> { return this.wrapLoc(new GossipText(this, this.array, this.index, false)); }
    get FemaleText() : WrappedLoc<this> { return this.wrapLoc(new GossipText(this, this.array, this.index, true)); }
    get Lang() { return this.wrap(lang(this.array, this.index)); }
    get Probability() { return this.wrap(probability(this.array, this.index)); }
    get Emote() { return this.wrap(emote(this.array, this.index)); }
    get EmoteDelay() { return this.wrap(emoteDelay(this.array, this.index)); }

    @Transient
    protected get Broadcast() { return this.wrap(broadcastID(this.array, this.index))}
}

export class GossipTextArray extends ArraySystem<GossipTextEntry, Gossip> {
    readonly row: npc_textRow;

    constructor(gossip: Gossip, row: npc_textRow) {
        super(gossip);
        this.row = row;
    }

    get length(): number {
        return 8;
    }

    get(index: number): GossipTextEntry {
        return new GossipTextEntry(this.owner, this, index);
    }

    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote = 0, emoteDelay = 0) {
        this.addGet()
            .MaleText.set(male)
            .FemaleText.set(female)
            .Lang.set(lang)
            .Emote.set(emote)
            .EmoteDelay.set(emoteDelay)
            .Probability.set(1)
        return this.owner;
    }

    add(text: loc_constructor, lang = 0, emote = 0,  emoteDelay = 0) {
        return this.addGendered(text,text,lang,emote,emoteDelay);
    }

    get ID() {
        return this.row.ID.get();
    }
}