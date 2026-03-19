---
title: "Implementing Ring-LWE from Scratch"
date: "2025-01-15"
excerpt: "A deep dive into building a Ring-LWE encryption scheme from first principles — polynomial rings, Gaussian noise, and why this lattice problem is post-quantum hard."
tags: ["Post-Quantum Cryptography", "Ring-LWE", "Python", "Lattice"]
---

## What is Ring-LWE?

Ring Learning With Errors (Ring-LWE) is a lattice-based cryptographic problem that forms the mathematical backbone of NIST's post-quantum standard **CRYSTALS-Kyber**. Unlike RSA or ECDH, Ring-LWE is believed to resist attacks from large-scale quantum computers.

The core hardness assumption: given $(a, b = a \cdot s + e \mod q)$ where $s$ is a secret polynomial and $e$ is Gaussian noise, it is computationally hard to recover $s$.

## The Polynomial Ring

We work in the ring:

$$R_q = \mathbb{Z}_q[x] / (x^n + 1)$$

For Kyber: $n = 256$, $q = 3329$.

Elements are polynomials of degree $< n$ with coefficients in $\mathbb{Z}_q$.

## Key Generation

```python
import numpy as np

q = 3329
n = 256
sigma = 3.19  # Gaussian noise parameter

def sample_poly():
    """Sample a uniformly random polynomial in R_q"""
    return np.random.randint(0, q, n)

def sample_gaussian():
    """Sample Gaussian noise polynomial"""
    noise = np.round(np.random.normal(0, sigma, n)).astype(int)
    return noise % q

def poly_mul(a, b, q, n):
    """Multiply two polynomials mod (x^n + 1, q)"""
    result = np.zeros(2*n - 1, dtype=int)
    for i in range(n):
        for j in range(n):
            result[i+j] = (result[i+j] + a[i]*b[j]) % q
    # Reduce mod x^n + 1
    for i in range(n, 2*n-1):
        result[i-n] = (result[i-n] - result[i]) % q
    return result[:n]

# Key generation
a = sample_poly()   # public parameter
s = sample_gaussian()  # secret key
e = sample_gaussian()  # error term
b = (poly_mul(a, s, q, n) + e) % q  # public key
```

## Encryption

To encrypt a bit $m \in \{0, 1\}$:

$$c_1 = a \cdot r + e_1 \mod q$$
$$c_2 = b \cdot r + e_2 + \lfloor q/2 \rfloor \cdot m \mod q$$

## Decryption

$$m' = c_2 - s \cdot c_1 \approx \lfloor q/2 \rfloor \cdot m + \text{noise}$$

Round to recover $m$. The noise stays small (Gaussian) and doesn't corrupt the message.

## Why is it Post-Quantum Hard?

The Shortest Vector Problem (SVP) on lattices has no known polynomial-time quantum algorithm. Ring-LWE reduces to SVP on ideal lattices, inheriting this hardness.

Shor's algorithm — which breaks RSA and ECC — exploits the algebraic structure of the discrete logarithm and integer factorization problems. No analogous structure exists in ideal lattices.

## What's Next

In the next post, I'll cover:
- NTT (Number Theoretic Transform) for fast polynomial multiplication in $O(n \log n)$
- Full Kyber-512 KEM implementation
- Side-channel resistance considerations

The code for this implementation is on GitHub: [cyberaionics/Kyber-KEM](https://github.com/cyberaionics/Kyber-KEM)
