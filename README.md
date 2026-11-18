# Aberrant Mobs

Open this repository folder in VS Code to work on both packs together.

- `behavior_pack/` contains gameplay definitions and JavaScript.
- `resource_pack/` contains models, textures, animations, and client entity definitions.
- `temp-resources/` contains the original supplied assets.

Minecraft's development pack folders link directly to the two pack folders in this repository. Saving a file here updates the file available through Minecraft's development path immediately. Reload the world or restart Minecraft as needed for it to reread changed content.

The local links are configured for this computer. If you move or clone the repository, create links from that installation's `development_behavior_packs/aberrant-mobs` and `development_resource_packs/aberrant-mobs` to the corresponding repository folders.

The resource pack is linked as a dependency of the behavior pack. The spider geometry, texture, and animations are included. Its client entity definition is still needed to connect the model to a visible entity.
