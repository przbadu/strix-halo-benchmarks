# llama-bench ROCm 7.2 on Strix Halo (Ryzen AI Max+ 395) — Qwen 3.5 Model Family

Running `llama-bench` with **ROCm 7.2** on AMD Ryzen AI Max+ 395 (Strix Halo) with 128GB unified memory.

All models are from [Unsloth](https://huggingface.co/unsloth) (UD quants).

## System Info

- **CPU/GPU**: AMD Ryzen AI Max+ 395 (Radeon 8060S, 40 CUs, 128GB unified)
- **OS**: Fedora
- **Kernel**: 6.18.13-200.fc43.x86_64
- **Backend**: ROCm 7.2
- **llama.cpp build**: d417bc43 (8245)

## Benchmarks

| model | size | params | backend | ngl | pp512/s | tg128/s |
|---|---|---|---|---|---|---|
| Qwen3.5-0.8B-UD-Q4_K_XL | 522.43 MiB | 0.75 B | ROCm | 99 | 5967.90 ± 53.06 | 175.81 ± 0.39 |
| Qwen3.5-0.8B-UD-Q8_K_XL | 1.09 GiB | 0.75 B | ROCm | 99 | 5844.56 ± 15.14 | 106.45 ± 2.42 |
| Qwen3.5-0.8B-BF16 | 1.40 GiB | 0.75 B | ROCm | 99 | 5536.84 ± 13.89 | 87.27 ± 2.37 |
| Qwen3.5-4B-UD-Q4_K_XL | 2.70 GiB | 4.21 B | ROCm | 99 | 1407.83 ± 6.01 | 44.63 ± 0.94 |
| Qwen3.5-4B-UD-Q8_K_XL | 5.53 GiB | 4.21 B | ROCm | 99 | 1384.80 ± 54.06 | 28.18 ± 0.04 |
| Qwen3.5-9B-UD-Q4_K_XL | 5.55 GiB | 8.95 B | ROCm | 99 | 917.83 ± 7.23 | 28.88 ± 0.09 |
| Qwen3.5-27B-UD-Q4_K_XL | 16.40 GiB | 26.90 B | ROCm | 99 | 264.30 ± 16.38 | 9.96 ± 0.02 |
| Qwen3.5-35B-A3B-UD-Q4_K_XL | 20.70 GiB | 34.66 B | ROCm | 99 | 887.15 ± 18.34 | 39.70 ± 0.06 |
| Qwen3.5-35B-A3B-UD-Q8_K_XL | 45.33 GiB | 34.66 B | ROCm | 99 | 603.63 ± 23.34 | 24.46 ± 0.02 |
| Qwen3.5-122B-A10B-UD-Q4_K_XL | 63.65 GiB | 122.11 B | ROCm | 99 | 268.41 ± 18.54 | 21.29 ± 0.01 |
| GLM-4.7-Flash-UD-Q4_K_XL | 16.31 GiB | 29.94 B | ROCm | 99 | 916.64 ± 16.52 | 46.34 ± 0.16 |
| GLM-4.7-Flash-UD-Q8_K_XL | 32.70 GiB | 29.94 B | ROCm | 99 | 823.00 ± 23.82 | 30.16 ± 0.03 |
| GPT-OSS-120B-UD-Q8_K_XL | 60.03 GiB | 116.83 B | ROCm | 99 | 499.41 ± 49.15 | 42.06 ± 0.06 |
| Qwen3-Coder-Next-UD-Q4_K_XL | 45.49 GiB | 79.67 B | ROCm | 99 | 524.61 ± 47.76 | 41.97 ± 0.03 |

## Highlights

- **Qwen3.5-0.8B Q4_K_XL** hits nearly **6000 t/s** prompt processing — insanely fast for a tiny model
- **MoE models shine**: Qwen3.5-35B-A3B (only 3B active) gets **887 pp512** and **~40 tg128** despite being a 35B model
- **122B model runs at ~21 t/s** generation — usable for a 122B parameter model on integrated graphics
- **GLM-4.7-Flash Q4** gets **916 pp512** and **46 tg128** — solid MoE performance
- **GPT-OSS-120B** at 60 GiB gets **42 t/s generation** — impressive for a 120B dense-ish model

## Interactive Benchmark Comparison

I also have Vulkan (RADV) benchmarks for the same models. You can compare ROCm vs Vulkan side-by-side with interactive filtering and charts:

**[https://przbadu.github.io/strix-halo-benchmarks/](https://przbadu.github.io/strix-halo-benchmarks/)**

Previous Vulkan benchmark post: [llama-bench Qwen3.5 models — Strix Halo](https://www.reddit.com/r/LocalLLaMA/comments/1rkl0tl/llamabench_qwen35_models_strix_halo/)
