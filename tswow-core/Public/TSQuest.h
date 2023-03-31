/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 *
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
#pragma once

#include "TSMain.h"
#include "TSClasses.h"

class TC_GAME_API TSQuest {
public:
    Quest const* quest;
    TSQuest();
    TSQuest(Quest const* quest);
    TSQuest* operator->() { return this;}
    operator bool() const { return quest != nullptr; }
    bool operator==(TSQuest const& rhs) { return quest == rhs.quest; }
    bool IsNull() { return quest == nullptr; };
    bool HasFlag(uint32 flag);
    bool IsDaily();
    bool IsRepeatable();
    TSNumber<uint32> GetID();
    TSNumber<uint32> GetLevel();
    TSNumber<uint32> GetMinLevel();
    TSNumber<int32> GetNextQuestID();
    TSNumber<int32> GetPrevQuestID();
    TSNumber<int32> GetNextQuestInChain();
    TSNumber<uint32> GetFlags();
    TSNumber<uint32> GetType();
};
