OS: Fedora
kernel: 6.18.13-200.fc43.x86_64

BACKEND: rocm-7.2
BENCHMARKS:

| model                        |    size |  params | backend  | ngl |           pp512/s |        tg128/s    |
|------------------------------|---------|---------|----------|-----|-------------------|-------------------|
| Qwen3.5-4B-UD-Q4_K_XL.gguf   | 2.70 GiB | 4.21 B | ROCm     |  99 |    1407.83 ± 6.01 |      44.63 ± 0.94 |
| Qwen3.5-4B-UD-Q8_K_XL.gguf   | 5.53 GiB | 4.21 B | ROCm     |  99 |    1384.80 ± 54.06 |      28.18 ± 0.04 |
| Qwen3.5-9B-UD-Q4_K_XL.gguf      | 5.55 GiB | 8.95 B | ROCm     |  99 |    917.83 ± 7.23 |      28.88 ± 0.09 |
| Qwen3.5-27B-UD-Q4_K_XL.gguf      | 16.40 GiB | 26.90 B | ROCm     |  99 |    264.30 ± 16.38 |      9.96 ± 0.02 |
| Qwen3.5-35B-A3B-UD-Q4_K_XL.gguf      | 20.70 GiB | 34.66 B | ROCm     |  99 |    887.15 ± 18.34 |      39.70 ± 0.06 |
| Qwen3.5-35B-A3B-UD-Q8_K_XL.gguf      | 45.33 GiB | 34.66 B | ROCm     |  99 |    603.63 ± 23.34 |      24.46 ± 0.02 |
| Qwen3.5-122B-A10B-UD-Q4_K_XL      | 63.65 GiB | 122.11 B | ROCm     |  99 |    268.41 ± 18.54 |      21.29 ± 0.01 |
