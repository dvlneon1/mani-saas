# @mani/design-system

Design system para Mani CRM - Nail Designers App.

## Instalação

```bash
npm install @mani/design-system
```

## Uso

### Componentes

```tsx
import { Button, Input, Card, Badge, Avatar } from '@mani/design-system';

// Button
<Button variant="default" size="lg" onPress={handlePress}>
  Salvar
</Button>

<Button variant="outline" leftIcon={<Icon />} isLoading>
  Carregando...
</Button>

// Input
<Input
  label="Email"
  placeholder="seu@email.com"
  error="Email inválido"
  helperText="Digite seu email cadastrado"
/>

// Card
<Card variant="elevated" pressable onPress={handlePress}>
  <Text>Conteúdo do card</Text>
</Card>

// Badge
<Badge variant="success" dot>Ativo</Badge>
<Badge variant="destructive" count={5} />

// Avatar
<Avatar src="https://..." name="Maria Silva" size="lg" onlineIndicator />

// Divider
<Divider />
<Divider label="ou" />
```

### Hooks

```tsx
import { useTokens, useTheme } from '@mani/design-system';

// Acessar tokens tipados
const tokens = useTokens('light');
console.log(tokens.colors.primary); // #8B5CF6

// Gerenciar tema
const { colorScheme, toggleTheme, setTheme } = useTheme();
```

### Utils

```tsx
import { cn, formatCurrency, formatDate, formatPhone } from '@mani/design-system';

// Merge de classes Tailwind
const className = cn('base-class', condition && 'conditional-class');

// Formatadores
formatCurrency(1234.56); // R$ 1.234,56
formatDate(new Date()); // 01/11/2026
formatPhone('11987654321'); // (11) 98765-4321
```

## Componentes

### Átomos

- **Button**: Botão com variants (default, secondary, outline, ghost, destructive, link), sizes (sm, default, lg, icon), estados (loading, disabled)
- **Input**: Campo de texto com label, error, helperText, ícones
- **Card**: Container com variants (default, elevated, outlined, interactive)
- **Badge**: Badge de status/count com variants de cor
- **Avatar**: Avatar com imagem, iniciais, placeholder, indicador online
- **Divider**: Separador horizontal/vertical com label opcional
- **Spinner**: Indicador de carregamento

### Moléculas

- **Toast**: Notificação com auto-dismiss, ação CTA
- **EmptyState**: Estado vazio com título, descrição, ação
- **ListItem**: Item de lista com leading/trailing content

### Organismos

- **Modal**: Modal básico com overlay
- **BottomSheet**: Bottom sheet com gesture (estrutura)

## Tokens

Design tokens disponíveis em `tokens.json`:

- **colors**: light/dark palettes
- **typography**: escalas tipográficas
- **spacing**: escala de espaçamento (0-16)
- **borderRadius**: raios de borda
- **shadows**: sombras
- **touchTargets**: tamanhos mínimos de toque (48dp)

## Dependências

- `class-variance-authority`: variants de componentes
- `clsx` + `tailwind-merge`: merge de classes
- `react-native`: componentes nativos
- `nativewind`: Tailwind CSS para React Native
