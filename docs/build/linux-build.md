# Linux Build

## Overview

The process involves two steps: compiling the eBPF probe and compiling the user space program.

### System Requirements

- Kernel version >= 5.10.0-21
- Glibc version >= 2.31
- LLVM version 15 (for compiling BPF bytecode with RedBPF)
- Linux kernel headers, vmlinux (with .BTF section), or raw BTF data (i.e., /sys/kernel/btf/vmlinux) to generate Rust bindings of the Linux kernel data structures

## Installing Dependencies

### Ubuntu

Install LLVM 15 and Linux kernel headers using the following commands:

```bash
# apt-get update \
  && apt-get -y install \
       wget \
       build-essential \
       software-properties-common \
       lsb-release \
       libelf-dev \
       linux-headers-generic \
       pkg-config \
  && wget https://apt.llvm.org/llvm.sh && chmod +x llvm.sh && ./llvm.sh 15 && rm -f ./llvm.sh
# llvm-config-15 --version | grep 15
```

### Fedora
Install LLVM 15 and Linux kernel headers with the following commands:

```bash
# dnf install -y \
	clang-15.0.0 \
	llvm-15.0.0 \
	llvm-libs-15.0.0 \
	llvm-devel-15.0.0 \
	llvm-static-15.0.0 \
	kernel \
	kernel-devel \
	elfutils-libelf-devel \
	make \
	libpolly-15-dev \
    	pkg-config \
    	zstd
# llvm-config --version | grep 15
```
### Arch Linux
Install LLVM 15 and Linux kernel headers using the following commands:

```bash
# pacman --noconfirm -Syu \
  && pacman -S --noconfirm \
       llvm \
       llvm-libs \
       libffi \
       clang \
       make \
       pkg-config \
       linux-headers \
       linux
# llvm-config --version | grep -q '^15'
```

## Building LLVM from Source

Use the following commands to build LLVM from source:

```bash
$ tar -xaf llvm-15.0.0.src.tar.xz
$ mkdir -p llvm-15.0.0.src/build
$ cd llvm-15.0.0.src/build
$ cmake .. -DCMAKE_INSTALL_PREFIX=$HOME/llvm-15-release -DCMAKE_BUILD_TYPE=Release -DLLVM_BUILD_LLVM_DYLIB=1
$ cmake --build . --target install
```

## Building RedBPF
Clone the llvm15 branch of https://github.com/SitinCloud/redbpf/ and use the following commands:

```bash
$ git clone https://github.com/foniod/redbpf.git
$ cd redbpf
$ git submodule sync
$ git submodule update --init
$ git fetch
$ git checkout llvm15
$ LLVM_SYS_150_PREFIX=$HOME/llvm-15-release/ cargo install --path cargo-bpf
```

## Compiling Owlyshield

We recommend compiling Owlyshield with Rust version 1.64.0 (LLVM 14.0.6). The process involves two steps:

1. Compiling the eBPF probes:

```bash
$ cd probes
$ cargo bpf build --target-dir=../target
$ cd ..
```

2. Compiling the user-space program that uses the probes:
```bash
$ cargo build --locked 
```

By following these instructions, you can successfully build Owlyshield for Linux. Make sure you meet the system requirements and follow the appropriate steps for your Linux distribution.
