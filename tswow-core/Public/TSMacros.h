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

#include <limits>

#define EVENT_TYPE(name,...) typedef void (*name##__Type)(__VA_ARGS__);
#define EVENT(name,...) TSEvent<name##__Type> name;

#define EVENT_HANDLE(category,name)\
    void name(category##name##__Type cb)\
    {\
        Add(this->events->category##name.Add(cb));\
    }

#define EVENT_HANDLE_FN(category,name,fn)\
    void name(category##name##__Type cb)\
    {\
        Add(this->events->category##name.Add(cb));\
        fn(cb,std::numeric_limits<uint32_t>::max());\
    }

#define MAP_EVENT_HANDLE(category,name)\
    void name(uint32 id, category##name##__Type cb)\
    {\
        Add(this->eventMap->Get(id)->category##name.Add(cb));\
    }\
    \
    void name(TSArray<uint32> ids, category##name##__Type cb)\
    {\
        for(uint32 id : ids)\
        {\
            name(id,cb);\
        }\
    }

#define MAP_EVENT_HANDLE_FN(category,name,fn)\
    void name(uint32 id, category##name##__Type cb)\
    {\
        Add(this->eventMap->Get(id)->category##name.Add(cb));\
        fn(cb,id);\
    }\
    \
    void name(TSArray<uint32> ids, category##name##__Type cb)\
    {\
        for (uint32 id : ids)\
        {\
            name(id, cb);\
        }\
    }

#define FIRE(name,...)\
    {\
        for(size_t __fire_i=0;__fire_i< GetTSEvents()->name.GetSize(); ++__fire_i)\
        {\
            GetTSEvents()->name.Get(__fire_i)(__VA_ARGS__);\
        }\
    }

#define FIRE_RETURN(name,retType,retVal,...)\
    {\
        retType rv = retVal;\
        for(size_t __fire_i=0;__fire_i< GetTSEvents()->name.GetSize(); ++__fire_i)\
        GetTSEvents()->name.Get(__fire_i)(__VA_ARGS__,TSMutable<retType>(&rv));\
        return retVal;\
    }

#define FIRE_MAP(obj,name,...)\
    FIRE(name,__VA_ARGS__);\
    {\
        if(obj)\
        {\
            for(size_t __fire_i=0;__fire_i< obj->name.GetSize(); ++__fire_i)\
            {\
                obj->name.Get(__fire_i)(__VA_ARGS__);\
            }\
        }\
    }

#define FIRE_BOOL(name,varname,...) \
    for(int __fire_i=0;__fire_i<GetTSEvents()->name.GetSize(); ++__fire_i) \
    { \
        GetTSEvents()->name.Get(__fire_i)(__VA_ARGS__, TSMutable<bool>(&varname)); \
        if(varname) break; \
    }

#define FIRE_BOOL_MAP(obj,name,varname,...) \
    FIRE_BOOL(name,varname,__VA_ARGS__) \
    if(obj && !varname) \
    for(int __fire_i=0;__fire_i<obj->name.GetSize(); ++__fire_i) \
    { \
        obj->name.Get(__fire_i)(__VA_ARGS__, TSMutable<bool>(&varname)); \
        if(varname) break; \
    }

#define const_(a) a