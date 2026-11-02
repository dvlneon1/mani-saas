import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { PostCard } from '../molecules/PostCard';

const gridVariants = cva('flex-1', {
  variants: {
    columns: {
      1: '',
      2: '',
      3: '',
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

export interface FeedItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  imageUrl: string;
  caption?: string;
  tags?: string[];
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  timeAgo?: string;
  folder?: string;
}

export interface FeedGridProps {
  /** Feed items */
  items: FeedItem[];
  /** Number of columns */
  columns?: 1 | 2 | 3;
  /** Item aspect ratio */
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'nail';
  /** Gap between items */
  gap?: number;
  /** Load more handler */
  onLoadMore?: () => void;
  /** Has more items */
  hasMore?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Refresh handler */
  onRefresh?: () => void;
  /** Refreshing state */
  refreshing?: boolean;
  /** Item press handler */
  onItemPress?: ((item: FeedItem) => void) | undefined;
  /** Like handler */
  onLikePress?: (item: FeedItem) => void;
  /** Comment handler */
  onCommentPress?: (item: FeedItem) => void;
  /** Share handler */
  onSharePress?: (item: FeedItem) => void;
  /** Save handler */
  onSavePress?: (item: FeedItem) => void;
  /** Author press handler */
  onAuthorPress?: (item: FeedItem) => void;
  /** CTA handler */
  onCtaPress?: (item: FeedItem) => void;
  /** Additional class names */
  className?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state action */
  emptyAction?: { label: string; onPress: () => void };
}

export const FeedGrid = React.forwardRef<any, FeedGridProps>(
  (
    {
      items,
      columns = 2,
      aspectRatio = 'nail',
      gap = 8,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      onRefresh,
      refreshing = false,
      onItemPress,
      onLikePress,
      onCommentPress,
      onSharePress,
      onSavePress,
      onAuthorPress,
      onCtaPress,
      className,
      emptyMessage = 'Nenhum post',
      emptyAction,
    },
    ref
  ) => {
    void ref;
    const handleItemPress = (item: FeedItem) => onItemPress?.(item);
    const handleLikePress = (item: FeedItem) => onLikePress?.(item);
    const handleCommentPress = (item: FeedItem) => onCommentPress?.(item);
    const handleSharePress = (item: FeedItem) => onSharePress?.(item);
    const handleSavePress = (item: FeedItem) => onSavePress?.(item);
    const handleAuthorPress = (item: FeedItem) => onAuthorPress?.(item);
    const handleCtaPress = (item: FeedItem) => onCtaPress?.(item);

    if (items.length === 0 && !isLoading) {
      return (
        <View
          className={cn(gridVariants({ columns }), className, 'flex-1 flex-items-center justify-center py-12 px-4')}
        >
          <View className="flex-col items-center gap-3 text-center">
            <Text className="text-[24px]">📭</Text>
            <Text className="text-[#9CA3AF] text-[14px]">{emptyMessage}</Text>
            {emptyAction && (
              <Pressable onPress={emptyAction.onPress} className="mt-2">
                <Text className="text-[#8B5CF6] font-medium text-[14px]">{emptyAction.label}</Text>
              </Pressable>
            )}
          </View>
        </View>
      );
    }

    return (
      // @ts-ignore
      <ScrollView
        className={cn(gridVariants({ columns }), className)}
        contentContainerStyle={{
          paddingHorizontal: gap,
          paddingVertical: gap,
          gap,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <View
              className="flex-row items-center justify-center py-4"
              style={{ height: 60 }}
            >
              <Text className="text-[#8B5CF6]">{refreshing ? 'Atualizando...' : 'Puxe para atualizar'}</Text>
            </View>
          ) : undefined
        }
        refreshing={refreshing}
        // @ts-ignore
        onRefresh={onRefresh}
        onScroll={({ nativeEvent }: any) => {
          if (onLoadMore && hasMore && !isLoading) {
            const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
            if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 200) {
              onLoadMore();
            }
          }
        }}
      > as any
        {items.map((item, index) => (
          <PostCard
            key={item.id}
            authorName={item.authorName}
            authorAvatar={item.authorAvatar}
            authorRole={item.authorRole}
            imageUrl={item.imageUrl}
            caption={item.caption}
            tags={item.tags}
            likesCount={item.likesCount}
            commentsCount={item.commentsCount}
            sharesCount={item.sharesCount}
            isLiked={item.isLiked}
            isSaved={item.isSaved}
            timeAgo={item.timeAgo}
            folder={item.folder}
            onPress={() => handleItemPress(item)}
            onLikePress={() => handleLikePress(item)}
            onCommentPress={() => handleCommentPress(item)}
            onSharePress={() => handleSharePress(item)}
            onSavePress={() => handleSavePress(item)}
            onAuthorPress={() => handleAuthorPress(item)}
            onCtaPress={() => handleCtaPress(item)}
            variant="feed"
          />
        ))}

        {hasMore && (isLoading || !items.length) && (
          <View className="flex-row items-center justify-center py-4">
            <Text className="text-[#9CA3AF] text-[13px]">
              {isLoading ? 'Carregando mais...' : 'Fim do feed'}{' '}
            </Text>
          </View>
        )}
      </ScrollView> as any
    );
  }
);

FeedGrid.displayName = 'FeedGrid';