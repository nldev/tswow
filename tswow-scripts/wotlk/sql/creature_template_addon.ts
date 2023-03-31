/*
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

/* tslint:disable */
import { int, mediumint, text, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class creature_template_addonRow extends SqlRow<creature_template_addonCreator,creature_template_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get path_id() {return new SQLCell<int, this>(this, 'path_id')}

    /**
     * No comment (yet!)
     */
    get mount() {return new SQLCell<mediumint, this>(this, 'mount')}

    /**
     * No comment (yet!)
     */
    get MountCreatureID() { return new SQLCell<mediumint, this>(this, 'MountCreatureID')}

    /**
     * No comment (yet!)
     */
    get StandState() { return new SQLCell<tinyint, this>(this, 'StandState')}

    /**
     * No comment (yet!)
     */
    get AnimTier() { return new SQLCell<tinyint, this>(this, 'AnimTier')}

    /**
     * No comment (yet!)
     */
    get VisFlags() { return new SQLCell<tinyint, this>(this, 'VisFlags')}

    /**
     * No comment (yet!)
     */
    get SheathState() { return new SQLCell<tinyint, this>(this, 'SheathState')}

    /**
     * No comment (yet!)
     */
    get PvPFlags() { return new SQLCell<tinyint, this>(this, 'PvPFlags')}

    /**
     * No comment (yet!)
     */
    get emote() {return new SQLCell<mediumint, this>(this, 'emote')}

    /**
     * No comment (yet!)
     */
    get visibilityDistanceType() {return new SQLCell<tinyint, this>(this, 'visibilityDistanceType')}

    /**
     * No comment (yet!)
     */
    get auras() {return new SQLCell<text, this>(this, 'auras')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : creature_template_addonCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_addonCreator = {
    entry? : mediumint,
    path_id? : int,
    mount? : mediumint,
    MountCreatureID?: int,
    StandState?: tinyint,
    AnimTier?: tinyint,
    VisFlags?: tinyint,
    SheathState?: tinyint,
    PvPFlags?: tinyint,
    emote? : mediumint,
    visibilityDistanceType? : tinyint,
    auras? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_addonQuery = {
    entry? : Relation<mediumint>,
    path_id? : Relation<int>,
    mount? : Relation<mediumint>,
    MountCreatureID? : Relation<int>,
    StandState?: Relation<tinyint>,
    AnimTier?: Relation<tinyint>,
    VisFlags?: Relation<tinyint>,
    SheathState?: Relation<tinyint>,
    PvPFlags?: Relation<tinyint>,
    emote? : Relation<mediumint>,
    visibilityDistanceType? : Relation<tinyint>,
    auras? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_template_addonTable extends SqlTable<
    creature_template_addonCreator,
    creature_template_addonQuery,
    creature_template_addonRow> {
    add(entry : mediumint, c? : creature_template_addonCreator) : creature_template_addonRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_addon = new creature_template_addonTable(
    'creature_template_addon',
    (table, obj)=>new creature_template_addonRow(table, obj))