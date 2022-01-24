import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
import { SearchBar } from 'react-native-elements';
import headerBackground from '../Slices/nav_bar.png';
import BackButton from '../Slices/Back.png';
import SearchButton from '../Slices/search.png';
import Data1 from '../API/CONTENTLISTINGPAGE-PAGE1.json';
import Data2 from '../API/CONTENTLISTINGPAGE-PAGE2.json';
import Data3 from '../API/CONTENTLISTINGPAGE-PAGE3.json';
import ProgressiveImage from '../../component/progressiveImage/progressiveImage'
import images from "../images/images"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Ionicons'
class MyApp extends React.Component {


    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = {
            loadingState: true,
            loadingData: [],
            initialData: [],
            showSearchBar: false,
            searchData: '',
        }
        // console.log(JSON.stringify(this.state.loadingData))

        // 

    }

    componentDidMount = async () => {

        this.setState({
            loadingData: Data1.page["content-items"].content,
            initialData: Data1.page["content-items"].content,
            loadingState: false,
        })
    }

    onClick() {
        let { showSearchBar } = this.state;
        this.setState({
            showSearchBar: !showSearchBar,
            loadingData: this.state.initialData,
        });
    }

    loadMoreData = () => {
        this.setState({
            loadingState: true,
        })

        if (this.state.loadingData.length == 20) {
            this.setState({
                loadingData: this.state.loadingData.concat(Data2.page["content-items"].content),
                initialData: this.state.loadingData.concat(Data2.page["content-items"].content),
                loadingState: false,
            })
        } else if (this.state.loadingData.length == 40) {
            this.setState({
                loadingData: this.state.loadingData.concat(Data3.page["content-items"].content),
                initialData: this.state.loadingData.concat(Data3.page["content-items"].content),
                loadingState: false,
            })
        } else {
            this.setState({
                loadingState: false,
            })
        }
    }

    SearchFilterFunction = (e) => {
        let text = e.toLowerCase()
        let tempData = this.state.loadingData
        let filteredName = tempData.filter((item) => {
            return item.name.toLowerCase().match(text)
        })
        if (!text || text === '') {
            this.setState({
                loadingData: this.state.initialData,
                searchData: e,
            })
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally
            this.setState({
                loadingData: true,
                searchData: e,
            })
        } else if (Array.isArray(filteredName)) {
            this.setState({
                noData: false,
                loadingData: filteredName,
                searchData: e,
            })
        }
    }

    renderItem = (item, index) => {
        return (
            <View style={{ paddingTop: 5 }}>
                <View>
                    <View style={{ padding: 10 }}>

                        <View>
                            <View>

                                {/* <Image
                                    source={images[item["poster-image"]]}
                                    style={{ height: 100, width: 100 }}
                                /> */}
                                <ProgressiveImage
                                    defaultImageSource={require('../Slices/placeholder_for_missing_posters.png')}
                                    source={item["poster-image"]}
                                    style={{ height: 100, width: 100 }}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{}}>
                                    <View style={{ marginTop: 10, marginBottom: 10, justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>
                </View>

            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={{ height: '8%', }}>
                        <ImageBackground source={headerBackground} imageStyle={{ resizeMode: 'cover', }} style={{ height: '158%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: 49, justifyContent: 'center', paddingLeft: 8 }}>
                                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => alert('back Button')} >
                                        <View style={{ height: '5%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={BackButton} style={styles.imageStyles} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ paddingLeft: 10, justifyContent: 'center', }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                        <View>
                                            <Text style={{ color: 'white', }}>{Data1.page.title}</Text>
                                        </View>
                                    </View>
                                </View>



                                {!this.state.showSearchBar ? (
                                    <View style={{ position: 'absolute', right: 0 }}>

                                        <TouchableOpacity onPress={this.onClick}>
                                            <View style={{ width: 45, height: 49, justifyContent: 'center' }}>
                                                <Image
                                                    source={SearchButton}
                                                    // style={{ height: 40, width: 49 }}
                                                    style={styles.imageStyles}
                                                    resizeMode={'contain'}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                        <View style={{}}>
                                            <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
                                                <View style={{ height: 35, width: 190, backgroundColor: 'white', borderRadius: 5 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        <View>
                                                            <Icon name="ios-search" />
                                                        </View>
                                                        <View >
                                                            <TextInput
                                                                // style={{ height: 35, }}
                                                                placeholder='search'
                                                                onChangeText={text => this.SearchFilterFunction(text)}
                                                                value={this.state.searchData}
                                                                width={120}
                                                                height={35}

                                                            />
                                                        </View>
                                                        <View style={{ position: 'absolute', right: 5 }}>
                                                            <TouchableOpacity onPress={this.onClick}>
                                                                <Icon name="close" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}

                            </View>
                        </ImageBackground>
                    </View>
                    {this.state.showSearchBar &&
                        <View style={{ paddingTop: 2, paddingBottom: 2, flex: 1 }}></View>
                    }
                    <View style={{ backgroundColor: 'black', height: '92.5%' }}>
                        <View style={{}}>
                            {this.state.loadingState ?
                                <ScrollView >
                                    <View style={{ marginLeft: 10 }}>
                                        <SkeletonPlaceholder>
                                            <View style={{ marginTop: 25 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 25 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 25 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 25 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 25 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 4 }} />
                                                        <View
                                                            style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>

                                        </SkeletonPlaceholder>
                                    </View>
                                </ScrollView>
                                :
                                <FlatList
                                    data={this.state.loadingData}
                                    renderItem={({ item, index }) => this.renderItem(item, index)}
                                    horizontal={false}
                                    numColumns={3}
                                    // onRefresh={() => this.getOnGoingChit(0)}
                                    showsVerticalScrollIndicator={true}
                                    showsHorizontalScrollIndicator={false}
                                    onEndReached={() => this.loadMoreData()}
                                    // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}

                                    persistentScrollbar={true}
                                />
                            }
                        </View>
                    </View>
                </View >
            </SafeAreaView >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },

    imageStyles: {
        width: 20,
        height: 21
        // width: '45%',
        // height: '70%'
    },
    navContainer: {
        flex: 1,
        // backgroundColor: '#E0E0E0',    
    },

});

export default MyApp;