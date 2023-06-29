import { Images } from '@/constants';
import { colors } from '@/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Screen = (props) => {
    const { children, withImageBlur } = props;
    return (
        <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.linearGradient}>
            {withImageBlur ? <ImageBackground
                source={Images.background}
                style={styles.imageBackground}
                imageStyle={styles.imageOpacity}

            >
                {children}
            </ImageBackground> : children}
        </LinearGradient>
    )
}

Screen.propTypes = {
    children: PropTypes.node.isRequired,
    withImageBlur: PropTypes.bool
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    imageBackground: {
        flex: 1
    },
    imageOpacity: {
        opacity: 0.15
    }
});

export default Screen