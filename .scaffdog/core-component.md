---
name: 'feature-component'
root: '.'
output: '.'
questions:
  name: 'Please enter a feature component name.'
  parent: 'Enter parent name（Can skip）',
  test:
    confirm: 'Do you need a unit test?'
    initial: true
---

# `src/cores/{{ inputs.parent }}/{{ inputs.name | pascal }}/index.svelte`

```
<script lang="ts">
</script>

<div>
</div>
```

# `src/{{ !inputs.test && '!' }}cores/{{ inputs.parent }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.ts`

```typescript
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import {{ inputs.name | pascal }} from './index.svelte';
```
