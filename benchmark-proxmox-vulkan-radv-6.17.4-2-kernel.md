OS: proxmox - pve-manager/9.1.6
kernel: 6.17.4-2-pve (2025-12-19T07:49Z)

BACKEND: Vulkan
BENCHMARKS:

| model                        |    size |  params | backend  | ngl |           pp512/s |        tg128/s    |
|------------------------------|---------|---------|----------|-----|-------------------|-------------------|
| Qwen3.5-4B-UD-Q4_K_XL.gguf   | 2.70 GiB | 4.21 B | Vulkan     |  99 |    1388.87 ± 10.68 |      48.53 ± 0.65 |
| Qwen3.5-4B-UD-Q8_K_XL.gguf   | 5.53 GiB | 4.21 B | Vulkan     |  99 |    1259.14 ± 3.82 |      27.95 ± 0.07 |
| Qwen3.5-9B-UD-Q4_K_XL.gguf      | 5.55 GiB | 8.95 B | Vulkan     |  99 |    819.24 ± 55.72 |      31.09 ± 0.05 |
| Qwen3.5-27B-UD-Q4_K_XL.gguf      | 16.40 GiB | 26.90 B | Vulkan     |  99 |    220.35 ± 3.36 |      10.66 ± 0.01 |
| Qwen3.5-35B-A3B-UD-Q4_K_XL.gguf      | 20.70 GiB | 34.66 B | Vulkan     |  99 |    865.72 ± 59.59 |      53.39 ± 0.08 |
| Qwen3.5-35B-A3B-UD-Q8_K_XL.gguf      | 45.33 GiB | 34.66 B | Vulkan     |  99 |    747.72 ± 44.81 |      31.83 ± 0.03 |
| Qwen3.5-122B-A10B-UD-Q4_K_XL      | 63.65 GiB | 122.11 B | Vulkan     |  99 |    247.16 ± 1.46 |      22.60 ± 0.01 |
