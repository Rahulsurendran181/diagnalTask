//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import images from "../../src/images/images"
// create a component
class ProgressiveImage extends Component {
    defaultImageAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleDefaultImageLoad = () => {
        Animated.timing(this.defaultImageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    handleImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    render() {
        const { defaultImageSource, source, style, ...props } = this.props;
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={defaultImageSource}
                    style={[style, { opacity: this.defaultImageAnimated }]}
                    onLoad={this.handleDefaultImageLoad}
                    blurRadius={1}
                />
                <Animated.Image
                    {...props}
                    // source={source}
                    source={images[source]}
                    style={[style, { opacity: this.imageAnimated }, styles.imageOverlay]}
                    onLoad={this.handleImageLoad}
                    
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});

//make this component available to the app
export default ProgressiveImage;
