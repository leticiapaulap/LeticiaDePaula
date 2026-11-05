# Miniatura 3D da hero

## Estado atual

O avatar geométrico foi removido da hero. A miniatura atual utiliza a arte 2D fornecida por Letícia, sem Canvas ou modelo 3D; veja `docs/mini-leticia-senappen.md`. A foto original e o restante da composição permanecem inalterados. As seções abaixo documentam a base 3D anterior, que continua inativa.

`components/portal/hero-character-canvas.tsx` foi mantido como uma base reutilizável e neutra para uma cena Three.js futura. `lib/hero-character.ts` mantém o caminho planejado `/models/leticia-mini.glb` e a resolução de clipes, sem tentar carregar um arquivo ausente. As dependências 3D permanecem instaladas.

## Verificação inicial e limites do asset

- Next.js **16.4.5**, React **19.3.0**, React Three Fiber **9.8.2**, Drei **10.7.9** e Three.js **0.186.1** estão instalados; `npm ls` não indicou incompatibilidades.
- O repositório não contém um modelo personalizado GLB/GLTF pronto para a hero.
- O repositório não contém `.glb`, `.gltf` ou `.blend`, e o Blender não está instalado/disponível no `PATH`.

## Próxima etapa para um avatar fiel

Criar e aprovar um avatar semirrealista baseado na referência autorizada, com rig articulado e clipes `Idle`, `Peek`, `Wave` e `Hide`; exportar e validar `public/models/leticia-mini.glb`; então montar a cena no Canvas existente, integrar carregamento/animações no cliente e revisar enquadramento, oclusão, hover, movimento reduzido e responsividade. Até que o asset exista e seja validado, a hero não exibe personagem.
