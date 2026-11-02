import React from 'react';
import { View, Text, Pressable, PressableProps, Image, ImageStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

const cardVariants = cva('rounded-xl bg-[#FFFFFF] shadow-sm border border-[#E5E7EB] overflow-hidden', {
  variants: {
    variant: {
      feed: '',
      detail: '',
    },
  },
  defaultVariants: {
    variant: 'feed',
  },
});

const imageAspectRatio = {
  feed: 'aspect-[4/5]',
  detail: 'aspect-[4/5]',
};

export interface PostCardProps
  extends VariantProps<typeof cardVariants>,
    Omit<PressableProps, 'children'> {
  /** Author name */
  authorName: string;
  /** Author avatar URL */
  authorAvatar?: string;
  /** Author role (designer, client, etc.) */
  authorRole?: string;
  /** Post image URL (4:5 aspect ratio) */
  imageUrl: string;
  /** Post caption */
  caption?: string;
  /** Tags/hashtags */
  tags?: string[];
  /** Likes count */
  likesCount?: number;
  /** Comments count */
  commentsCount?: number;
  /** Shares count */
  sharesCount?: number;
  /** Whether current user liked */
  isLiked?: boolean;
  /** Whether current user saved */
  isSaved?: boolean;
  /** Posted time ago */
  timeAgo?: string;
  /** Folder name if in folder */
  folder?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA handler */
  onCtaPress?: () => void;
  /** Like handler */
  onLikePress?: () => void;
  /** Comment handler */
  onCommentPress?: () => void;
  /** Share handler */
  onSharePress?: () => void;
  /** Save handler */
  onSavePress?: () => void;
  /** Author press handler */
  onAuthorPress?: () => void;
  /** Image press handler */
  onImagePress?: () => void;
  /** Additional class names */
  className?: string;
}

export const PostCard = React.forwardRef<React.ElementRef<typeof View>, PostCardProps>(
  (
    {
      authorName,
      authorAvatar,
      authorRole,
      imageUrl,
      caption,
      tags = [],
      likesCount = 0,
      commentsCount = 0,
      sharesCount = 0,
      isLiked = false,
      isSaved = false,
      timeAgo,
      folder,
      ctaText = 'Quero esta',
      onCtaPress,
      onLikePress,
      onCommentPress,
      onSharePress,
      onSavePress,
      onAuthorPress,
      onImagePress,
      variant = 'feed',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Pressable
        ref={ref as any}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <Pressable
          onPress={onAuthorPress}
          className="p-3 flex-row items-center gap-3"
          accessibilityRole="button"
          accessibilityLabel={`Autor ${authorName}`}
        >
          <Avatar size="sm" src={authorAvatar}>
            {authorName.charAt(0).toUpperCase()}
          </Avatar>
          <View className="flex-1 min-w-0 flex-col">
            <Text className="font-semibold text-[#111827] text-[13px] truncate">
              {authorName}
            </Text>
            <View className="flex-row items-center gap-1">
              {authorRole && (
                <Text className="text-[#9CA3AF] text-[11px]">{authorRole}</Text>
              )}
              {timeAgo && (
                <>
                  <Text className="text-[#9CA3AF] text-[11px]">·</Text>
                  <Text className="text-[#9CA3AF] text-[11px]">{timeAgo}</Text>
                </>
              )}
            </View>
          </View>
          {folder && (
            <Badge variant="secondary" size="sm" className="ml-auto">
              📁 {folder}
            </Badge>
          )}
        </Pressable>

        {/* Image */}
        <Pressable
          onPress={onImagePress}
          className={cn('relative overflow-hidden', imageAspectRatio[variant as keyof typeof imageAspectRatio])}
          accessibilityRole="image"
          accessibilityLabel="Imagem do post"
        >
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
            style={[
              {
                width: '100%',
                aspectRatio: 4 / 5,
              },
            ] as unknown as ImageStyle}
          />
          {/* Blurhash placeholder would go here */}
        </Pressable>

        {/* Actions */}
        <View className="p-3 flex-row items-center gap-4">
          <Pressable
            onPress={onLikePress}
            className="flex-row items-center gap-1.5"
            accessibilityRole="button"
            accessibilityLabel={isLiked ? 'Descurtir' : 'Curtir'}
            accessibilityState={{ selected: isLiked }}
          >
            <Text className="text-[20px]">{isLiked ? '❤️' : '🤍'}</Text>
            {likesCount > 0 && (
              <Text className="font-medium text-[#111827] text-[12px]">
                {likesCount}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={onCommentPress}
            className="flex-row items-center gap-1.5"
            accessibilityRole="button"
            accessibilityLabel={`Comentários ${commentsCount}`}
          >
            <Text className="text-[20px]">💬</Text>
            {commentsCount > 0 && (
              <Text className="font-medium text-[#111827] text-[12px]">
                {commentsCount}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={onSharePress}
            className="flex-row items-center gap-1.5"
            accessibilityRole="button"
            accessibilityLabel={`Compartilhamentos ${sharesCount}`}
          >
            <Text className="text-[20px]">📤</Text>
            {sharesCount > 0 && (
              <Text className="font-medium text-[#111827] text-[12px]">
                {sharesCount}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={onSavePress}
            className="ml-auto flex-row items-center gap-1.5"
            accessibilityRole="button"
            accessibilityLabel={isSaved ? 'Remover dos salvos' : 'Salvar'}
            accessibilityState={{ selected: isSaved }}
          >
            <Text className="text-[20px]">{isSaved ? '🔖' : '🔖'}</Text>
          </Pressable>
        </View>

        {/* Caption & Tags */}
        {(caption || tags.length > 0) && (
          <View className="px-3 pb-3 flex-col gap-2">
            {caption && (
              <Text className="text-[#111827] text-[13px] leading-relaxed">
                {caption}
              </Text>
            )}
            {tags.length > 0 && (
              <View className="flex-row flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </View>
            )}
          </View>
        )}

        {/* CTA */}
        {ctaText && onCtaPress && (
          <View className="px-3 pb-3 pt-2 border-t border-[#E5E7EB]">
            <Button
              variant="secondary"
              size="default"
              className="w-full"
              onPress={onCtaPress}
            >
              {ctaText}
            </Button>
          </View>
        )}
      </Pressable>
    );
  }
);

PostCard.displayName = 'PostCard';