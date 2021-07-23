import React, {useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ShowTyres} from "./ShowTyres";
import {AddTyres} from "./AddTyres";
import { Ionicons } from '@expo/vector-icons';
import {ShowSettings} from "./ShowSettings";
import {AddSettings} from "./AddSettings";

const Tab = createBottomTabNavigator();

export const GPPage = ({GP, onRemoveSetting, settingsArr, tyres, onSubmit, stintST, onRemove, teams, colors, setupTitles, onSubmitSettings}) => {
    const [team, setTeam] = useState(0);
    const showTyresTitle = 'TYRES',
        addTyresTitle = 'ADD TYRES',
        showSettings = 'SETUPS',
        addSettings = 'ADD SETUP';
    const addAccept = (stints) => {
        onSubmit(stints, team);
    };
    const addAcceptSettings = (clone, mark, team) => {
        onSubmitSettings(clone, team, mark)
    };
    const removeSetting = id => {
        onRemoveSetting(id);
    }
    const removeStint = id =>{
        onRemove(id);
    }
    const minTeam = () => {
        if (team === 0) setTeam(teams.length - 1);
        else setTeam(team - 1);
    },
        plusTeam = () => {
        if (team === teams.length - 1) setTeam(0);
        else setTeam(team + 1);
    }
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon : ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === showTyresTitle) {
                        iconName = focused
                            ? 'color-filter'
                            : 'color-filter-outline';
                    } else if (route.name === addTyresTitle) {
                        iconName = focused
                            ? 'add-circle'
                            : 'add-circle-outline';
                    } else if (route.name === addSettings) {
                        iconName = focused
                            ? 'caret-up-circle'
                            : 'caret-up-circle-outline';
                    } else if (route.name === showSettings) {
                        iconName = focused
                            ? 'cog'
                            : 'cog-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor : '#00D2BE',
                inactiveTintColor : '#C8C8C8',
                style : {
                    backgroundColor : '#006F62',
                    borderTopWidth: 3,
                    borderTopColor: '#006F62',
                    fontFamily : 'F1Bold',
                    paddingTop : 5,
                    paddingBottom : 5
                }
            }}
        >
            <Tab.Screen name={showTyresTitle}>{props => <ShowTyres {...props}
                                                                   GP={GP}
                                                                   stints={stintST}
                                                                   tyres={tyres}
                                                                   onRemove={removeStint}
                                                                   teams={teams}
                                                                   colors={colors}
            />}</Tab.Screen>
            <Tab.Screen name={showSettings}>{
                props => <ShowSettings {...props}
                                       GP={GP}
                                       teams={teams}
                                       colors={colors}
                                       settingsArr={settingsArr}
                                       onRemove={removeSetting}
                />
            }</Tab.Screen>
            <Tab.Screen name={addTyresTitle}>{props => <AddTyres {...props}
                                                                 tyres={tyres}
                                                                 onSubmit={addAccept}
                                                                 teamPic={teams[team]}
                                                                 color={colors[team]}
                                                                 onMinTeam={minTeam}
                                                                 onPlusTeam={plusTeam}
            />}</Tab.Screen>
            <Tab.Screen name={addSettings}>{
                props => <AddSettings {...props}
                                      color={colors[team]}
                                      onMinTeam={minTeam}
                                      onPlusTeam={plusTeam}
                                      teamPic={teams[team]}
                                      setupTitles={setupTitles}
                                      onSubmit={(clone, mark) => addAcceptSettings(clone, mark, team)}
                />
            }</Tab.Screen>
        </Tab.Navigator>
    )
}
