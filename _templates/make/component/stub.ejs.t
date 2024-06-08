---
to: resources/js/domains/<%= selectedDomain %>/components/<%= fileName %>.tsx
---

interface <%= fileName %>Props {
  test: string;
}

export function <%= fileName %>({ test }: <%= fileName %>Props) {
  return (
    <>
      { test }
    </>
  )
}


