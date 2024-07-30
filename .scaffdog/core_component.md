---
name: 'core components'
root: '.'
output: '.'
questions:
  name: 'Please enter a core component name.'
  parent:
    message: 'Enter parent name（Can skip）'
---

# `src/cores/{{ inputs.parent | pascal }}/{{ inputs.name | pascal }}/index.svelte`

```
<script lang="ts">
</script>

<div>
</div>
```
