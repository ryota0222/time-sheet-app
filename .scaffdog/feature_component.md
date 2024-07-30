---
name: 'feature components'
root: '.'
output: '.'
questions:
  name: 'Please enter a feature component name.'
  parent:
    message: 'Enter parent name（Can skip）'
  test:
    confirm: 'Do you need a unit test?'
    initial: true
---

# `src/features/{{ inputs.parent }}/{{ inputs.name | pascal }}/index.svelte`

```
<script lang="ts">
</script>

<div>
</div>
```

# `{{ !inputs.test && '!' }}src/features/{{ inputs.parent | pascal }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.ts`

```typescript
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import {{ inputs.name | pascal }} from './index.svelte';
```
