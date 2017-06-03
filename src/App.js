/**
 * Created by heyong on 2017/1/2.
 */
import React, { Component } from 'react'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import apiRequest from './helper/apiRequestMiddleware'
import reducers from './reducers'
import Home from './pages/MainScreen'

import {
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    BackAndroid,
    DrawerLayoutAndroid,
    Navigator,
    View
} from 'react-native'

const createStoreWithMiddleware = applyMiddleware(thunk, apiRequest)(createStore)
const store = autoRehydrate()(createStoreWithMiddleware)(reducers)
persistStore(store, {storage: AsyncStorage})

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const NAV_BAR_HEIGHT = (Platform.OS === 'ios' ? 44 : 56)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19

export default class extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    handleBack = () => {
        const navigator = this.refs.navigator

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop()
            return true
        }
        else {
            return false
        }
    };

    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    I'm in the Drawer!
                </Text>
            </View>
        );
        return (
            <Provider store={store}>
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1}}>
                        <StatusBar
                            barStyle='light-content'
                            backgroundColor='transparent'
                            style={{height: STATUS_BAR_HEIGHT}}
                            translucent={ABOVE_LOLIPOP}
                        />
                        <Navigator
                            ref='navigator'
                            initialRoute={{
                                component: Home
                            }}
                            configureScene={this.configureScene}
                            renderScene={(route, navigator) => {
                                return <route.component navigator={navigator} {...route} {...route.passProps}/>
                            }}/>
                    </View>
                </DrawerLayoutAndroid>
            </Provider>
        );
    }

    configureScene = (route) => {
        return route.scene || Navigator.SceneConfigs.FloatFromBottom
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});