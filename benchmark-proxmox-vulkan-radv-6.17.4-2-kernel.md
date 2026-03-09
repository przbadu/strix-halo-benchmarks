OS: proxmox - pve-manager/9.1.6
kernel: 6.17.4-2-pve (2025-12-19T07:49Z)

BACKEND: Vulkan
BENCHMARKS:

| model                        |    size |  params | backend  | ngl |           pp512/s |        tg128/s    |
|------------------------------|---------|---------|----------|-----|-------------------|-------------------|
| Qwen3.5-0.8B-UD-Q4_K_XL.gguf | 522.43 MiB | 0.75 B | Vulkan |  99 |    5731.77 ± 32.89 |     178.22 ± 4.27 |
| Qwen3.5-0.8B-UD-Q8_K_XL.gguf | 1.09 GiB | 0.75 B | Vulkan   |  99 |    5076.72 ± 23.05 |     107.21 ± 3.26 |
| Qwen3.5-0.8B-BF16.gguf       | 1.40 GiB | 0.75 B | Vulkan   |  99 |    2856.64 ± 158.56 |      85.45 ± 1.88 |
| Qwen3.5-4B-UD-Q4_K_XL.gguf   | 2.70 GiB | 4.21 B | Vulkan   |  99 |    1388.87 ± 10.68 |      48.53 ± 0.65 |
| Qwen3.5-4B-UD-Q8_K_XL.gguf   | 5.53 GiB | 4.21 B | Vulkan   |  99 |    1259.14 ± 3.82 |      27.95 ± 0.07 |
| Qwen3.5-9B-UD-Q4_K_XL.gguf   | 5.55 GiB | 8.95 B | Vulkan   |  99 |    819.24 ± 55.72 |      31.09 ± 0.05 |
| Qwen3.5-27B-UD-Q4_K_XL.gguf  | 16.40 GiB | 26.90 B | Vulkan |  99 |    220.35 ± 3.36 |      10.66 ± 0.01 |
| Qwen3.5-35B-A3B-UD-Q4_K_XL.gguf | 20.70 GiB | 34.66 B | Vulkan |  99 |    865.72 ± 59.59 |      53.39 ± 0.08 |
| Qwen3.5-35B-A3B-UD-Q8_K_XL.gguf | 45.33 GiB | 34.66 B | Vulkan |  99 |    747.72 ± 44.81 |      31.83 ± 0.03 |
| Qwen3.5-122B-A10B-UD-Q4_K_XL | 63.65 GiB | 122.11 B | Vulkan |  99 |    247.16 ± 1.46 |      22.60 ± 0.01 |
| GLM-4.7-Flash-UD-Q4_K_XL.gguf | 16.31 GiB | 29.94 B | Vulkan |  99 |    797.40 ± 31.29 |      63.59 ± 0.13 |
| GLM-4.7-Flash-UD-Q8_K_XL.gguf | 32.70 GiB | 29.94 B | Vulkan |  99 |    828.90 ± 7.07 |      39.28 ± 0.10 |
| GPT-OSS-120B-UD-Q8_K_XL.gguf | 60.03 GiB | 116.83 B | Vulkan |  99 |    443.29 ± 2.99 |      42.13 ± 0.06 |
| Qwen3-Coder-Next-UD-Q4_K_XL.gguf | 45.49 GiB | 79.67 B | Vulkan |  99 |    421.43 ± 2.45 |      40.08 ± 1.98 |
