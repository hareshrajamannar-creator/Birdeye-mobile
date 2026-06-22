import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Layout } from '../../tokens';
import type { Platform } from '../../types';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
}

const PLATFORM_CONFIG: Record<
  Platform,
  { iconName: keyof typeof MaterialCommunityIcons.glyphMap; color: string; bgColor: string }
> = {
  twitter: {
    iconName: 'twitter',
    color: Colors.white,
    bgColor: Colors.platformX,
  },
  facebook: {
    iconName: 'facebook',
    color: Colors.white,
    bgColor: Colors.platformFacebook,
  },
  instagram: {
    iconName: 'instagram',
    color: Colors.white,
    bgColor: Colors.platformInstagram,
  },
  linkedin: {
    iconName: 'linkedin',
    color: Colors.white,
    bgColor: Colors.platformLinkedIn,
  },
  youtube: {
    iconName: 'youtube',
    color: Colors.white,
    bgColor: Colors.platformYouTube,
  },
  tiktok: {
    iconName: 'music-note',
    color: Colors.white,
    bgColor: Colors.platformTikTok,
  },
  pinterest: {
    iconName: 'pinterest',
    color: Colors.white,
    bgColor: Colors.platformPinterest,
  },
};

export default function PlatformIcon({ platform, size = Layout.platformIconSize }: PlatformIconProps) {
  const config = PLATFORM_CONFIG[platform];

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: config.bgColor,
        },
      ]}
      accessibilityLabel={platform}
      accessibilityRole="image"
    >
      <MaterialCommunityIcons
        name={config.iconName}
        size={size * 0.65}
        color={config.color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
