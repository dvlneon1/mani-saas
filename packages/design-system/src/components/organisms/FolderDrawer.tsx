import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Keyboard, Platform } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

const drawerVariants = cva('fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl', {
  variants: {
    size: {
      small: 'h-[30%]',
      medium: 'h-[50%]',
      large: 'h-[70%]',
      full: 'h-[90%]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const handleVariants = cva('w-10 h-1.5 rounded-full mx-auto bg-[#E5E7EB]', {
  variants: {},
  defaultVariants: {},
});

export interface Folder {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  postCount?: number;
  isSystem?: boolean;
}

export interface FolderDrawerProps {
  /** Folders list */
  folders: Folder[];
  /** Currently selected folder ID */
  selectedFolderId?: string;
  /** Folder selection handler */
  onFolderSelect?: (folderId: string) => void;
  /** Create folder handler */
  onCreateFolder?: (name: string, color?: string, icon?: string) => void;
  /** Update folder handler */
  onUpdateFolder?: (folderId: string, updates: Partial<Folder>) => void;
  /** Delete folder handler */
  onDeleteFolder?: (folderId: string) => void;
  /** Drawer visibility */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Allow creating folders */
  allowCreate?: boolean;
  /** Allow editing folders */
  allowEdit?: boolean;
  /** Allow deleting folders */
  allowDelete?: boolean;
  /** Drawer size */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Title */
  title?: string;
  /** Additional class names */
  className?: string;
}

const FOLDER_COLORS = [
  '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
  '#EF4444', '#06B6D4', '#8B5CF6', '#F97316',
];

const FOLDER_ICONS = ['📁', '⭐', '❤️', '💡', '🎨', '📸', '✨', '🔖'];

export const FolderDrawer = React.forwardRef<any, FolderDrawerProps>(
  (
    {
      folders,
      selectedFolderId,
      onFolderSelect,
      onCreateFolder,
      onUpdateFolder,
      onDeleteFolder,
      visible,
      onClose,
      allowCreate = true,
      allowEdit = true,
      allowDelete = true,
      size = 'medium',
      title = 'Pastas',
      className,
    },
    ref
  ) => {
    const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
    const [editName, setEditName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderColor, setNewFolderColor] = useState(FOLDER_COLORS[0]);
    const [newFolderIcon, setNewFolderIcon] = useState(FOLDER_ICONS[0]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    if (!visible) return null;

    const handleCreateFolder = () => {
      if (!newFolderName.trim()) return;
      onCreateFolder?.(newFolderName.trim(), newFolderColor, newFolderIcon);
      setNewFolderName('');
      setNewFolderColor(FOLDER_COLORS[0]);
      setNewFolderIcon(FOLDER_ICONS[0]);
      setShowCreateForm(false);
    };

    const handleUpdateFolder = () => {
      if (!editingFolder || !editName.trim()) return;
      onUpdateFolder?.(editingFolder.id, { name: editName.trim() });
      setEditingFolder(null);
      setEditName('');
    };

    const handleDeleteFolder = (folderId: string) => {
      onDeleteFolder?.(folderId);
    };

    const handleStartEdit = (folder: Folder) => {
      setEditingFolder(folder);
      setEditName(folder.name);
    };

    const handleCancelEdit = () => {
      setEditingFolder(null);
      setEditName('');
    };

    return (
      <View
        ref={ref}
        className={cn(drawerVariants({ size }), className)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        {/* Backdrop */}
        // @ts-ignore
        <Pressable
          onPress={onClose}
          className="absolute inset-0 bg-black/50 z-[-1]"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any}
          accessibilityHidden={true}
        /> as any

        {/* Handle */}
        <View className="pt-3 pb-2">
          <View className={handleVariants()} />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-3 border-b border-[#E5E7EB]">
          <Text className="font-semibold text-[16px] text-[#111827]">{title}</Text>
          <View className="flex-row items-center gap-2">
            {allowCreate && !showCreateForm && (
              <Button variant="ghost" size="sm" onPress={() => setShowCreateForm(true)}>
                + Nova
              </Button>
            )}
            <Pressable onPress={onClose} className="p-2" accessibilityLabel="Fechar">
              <Text className="text-[20px] text-[#9CA3AF]">✕</Text>
            </Pressable>
          </View>
        </View>

        {/* Create Form */}
        {showCreateForm && (
          <View className="px-4 pb-4 border-b border-[#E5E7EB] flex-col gap-3">
            <TextInput
              value={newFolderName}
              onChangeText={setNewFolderName}
              placeholder="Nome da pasta"
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
              autoFocus
              maxLength={30}
            />
            <View className="flex-col gap-2">
              <Text className="text-[12px] text-[#4B5563] font-medium">Cor</Text>
              <View className="flex-row gap-2 flex-wrap">
                {FOLDER_COLORS.map((color, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setNewFolderColor(color)}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 flex-items-center justify-center',
                      newFolderColor === color ? 'border-white shadow-md' : 'border-transparent',
                      'ring-2 ring-offset-2'
                    )}
                    style={{
                      backgroundColor: color,
                      borderColor: newFolderColor === color ? '#FFFFFF' : 'transparent',
                    } as any}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: newFolderColor === color }}
                    accessibilityLabel={`Cor ${index + 1}`}
                  >
                    {newFolderColor === color && <Text className="text-white text-[12px] font-bold">✓</Text>}
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="flex-col gap-2">
              <Text className="text-[12px] text-[#4B5563] font-medium">Ícone</Text>
              <View className="flex-row gap-2 flex-wrap">
                {FOLDER_ICONS.map((icon, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setNewFolderIcon(icon)}
                    className={cn(
                      'w-10 h-10 rounded-lg flex-items-center justify-center text-[20px] border-2',
                      newFolderIcon === icon ? 'border-[#8B5CF6] bg-[#F5F3FF]' : 'border-transparent bg-[#F9FAFB]'
                    )}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: newFolderIcon === icon }}
                    accessibilityLabel={`Ícone ${index + 1}`}
                  >
                    {icon}
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="flex-row gap-2">
              <Button variant="outline" size="sm" className="flex-1" onPress={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
              <Button variant="default" size="sm" className="flex-1" onPress={handleCreateFolder} disabled={!newFolderName.trim()}>
                Criar
              </Button>
            </View>
          </View>
        )}

        {/* Folders List */}
        <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
          {folders.length === 0 ? (
            <View className="flex-col items-center justify-center py-12 gap-2">
              <Text className="text-[24px]">📁</Text>
              <Text className="text-[#9CA3AF] text-[14px]">Nenhuma pasta</Text>
              {allowCreate && (
                <Text className="text-[#8B5CF6] text-[13px]">Toque em "Nova" para criar uma</Text>
              )}
            </View>
          ) : (
            <View className="flex-col gap-2">
              {folders.map((folder) => {
                const isSelected = folder.id === selectedFolderId;
                const isEditing = editingFolder?.id === folder.id;
                const isSystem = folder.isSystem;

                if (isEditing) {
                  return (
                    <View key={folder.id} className="flex-col gap-2 p-3 bg-[#F5F3FF] rounded-lg">
                      <TextInput
                        value={editName}
                        onChangeText={setEditName}
                        className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                        autoFocus
                        maxLength={30}
                        onSubmitEditing={handleUpdateFolder}
                        onBlur={handleCancelEdit}
                      />
                      <View className="flex-row gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onPress={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button variant="default" size="sm" className="flex-1" onPress={handleUpdateFolder} disabled={!editName.trim()}>
                          Salvar
                        </Button>
                      </View>
                    </View>
                  );
                }

                return (
                  <Pressable
                    key={folder.id}
                    onPress={() => onFolderSelect?.(folder.id)}
                    onLongPress={() => allowEdit && !isSystem && handleStartEdit(folder)}
                    className={cn(
                      'flex-row items-center gap-3 p-3 rounded-lg transition-colors',
                      isSelected ? 'bg-[#F5F3FF]' : 'active:bg-[#F3F4F6]'
                    )}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={folder.name}
                  >
                    <View
                      className="w-10 h-10 rounded-lg flex-items-center justify-center text-[20px] flex-shrink-0"
                      style={{ backgroundColor: folder.color ? `${folder.color}20` : '#F3F4F6' }}
                    >
                      {folder.icon || '📁'}
                    </View>

                    <View className="flex-1 min-w-0 flex-col gap-0.5">
                      <View className="flex-row items-center gap-2">
                        <Text
                          className={cn(
                            'font-medium text-[14px] truncate flex-1',
                            isSelected ? 'text-[#8B5CF6]' : 'text-[#111827]'
                          )}
                        >
                          {folder.name}
                        </Text>
                        {isSystem && (
                          <Badge variant="secondary" size="sm">Sistema</Badge>
                        )}
                      </View>
                      {folder.postCount !== undefined && (
                        <Text className="text-[12px] text-[#9CA3AF]">
                          {folder.postCount} {folder.postCount === 1 ? 'post' : 'posts'}
                        </Text>
                      )}
                    </View>

                    <View className="flex-row items-center gap-1">
                      {isSelected && (
                        <View className="w-5 h-5 rounded-full border-2 border-[#8B5CF6] flex-items-center justify-center">
                          <View className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                        </View>
                      )}
                      {allowEdit && !isSystem && (
                        <Pressable
                          onPress={(e) => { e.preventDefault(); handleStartEdit(folder); }}
                          className="p-1"
                          accessibilityLabel={`Editar ${folder.name}`}
                        >
                          <Text className="text-[16px] text-[#9CA3AF]">✏️</Text>
                        </Pressable>
                      )}
                      {allowDelete && !isSystem && (
                        <Pressable
                          onPress={(e) => { e.preventDefault(); handleDeleteFolder(folder.id); }}
                          className="p-1"
                          accessibilityLabel={`Excluir ${folder.name}`}
                        >
                          <Text className="text-[16px] text-[#EF4444]">🗑</Text>
                        </Pressable>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
);

FolderDrawer.displayName = 'FolderDrawer';