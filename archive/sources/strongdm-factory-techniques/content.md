> Archived source snapshot  
> Source ID: `strongdm-factory-techniques`  
> Original URL: <https://factory.strongdm.ai/techniques>  
> Final URL: <https://factory.strongdm.ai/techniques>  
> Title: Techniques | StrongDM Software Factory  
> Captured at: `2026-09-15T10:26:07Z`

---

## Techniques

Patterns we return to frequently while building with the Software Factory

### [Digital Twin Universe (DTU)](https://factory.strongdm.ai/techniques/dtu)

Clone the externally observable behaviors of critical third-party dependencies. Validate at volumes and rates far exceeding production limits, with deterministic, replayable test conditions.

### [Gene Transfusion](https://factory.strongdm.ai/techniques/gene-transfusion)

Move working patterns between codebases by pointing agents at concrete exemplars. A solution paired with a good reference can be reproduced in new contexts.

### [The Filesystem](https://factory.strongdm.ai/techniques/filesystem)

Models can navigate repositories quickly and adjust their own context by reading and writing files. Directories, indexes, and on-disk state become a practical memory substrate.

### [Shift Work](https://factory.strongdm.ai/techniques/shift-work)

Separate interactive work from fully specified work. When intent is complete (specs, tests, existing apps), an agent can run end-to-end without back-and-forth.

### [Semport](https://factory.strongdm.ai/techniques/semport)

Semantically-aware automated ports, one time or ongoing. Move code between languages or frameworks while preserving intent.

### [Pyramid Summaries](https://factory.strongdm.ai/techniques/pyramid-summaries)

Reversible summarization at multiple zoom levels. Compress context without losing the ability to expand back to full detail.

## The Validation Constraint

Given zero hand-written code and zero traditional review, we required a system that could:

- Grow from cascades of natural-language specifications
- Be validated automatically without semantic inspection of source

Code was treated analogously to an ML model snapshot: opaque weights whose correctness is inferred exclusively from externally observable behavior. Internal structure is treated as opaque.
