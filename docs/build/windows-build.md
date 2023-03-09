# Building instructions (Windows)

We provide an installer [in the release section](https://github.com/SitinCloud/Owlyshield/releases). If you prefer to build it yourself, this page is for you.

## Prerequisites

1. Install the [Microsoft Visual C++ Redistributable](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170) packages
2. [Disable "Driver Signature Enforcement"](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/test-signing) at Windows startup. This is only required if you did not [get a copy](mailto:register@sitincloud) of the driver signed by Microsoft for [SitinCloud](https://wwww.sitincloud.com) (we provide it for free if you are a contributor),
3. Rust from [rust-lang.org](https://rust-lang.org) (pay attention to take the *Visual Studio ABI* version if you get it from choco),
4. [InnoSetup](https://jrsoftware.org/isdl.php).


## Components

Owlyshield consists of the following components:
* Runtime components:
  * Owlyshield Predict - the prediction unit (user space) collects data from the minifilter to make prediction about running processes. This is a Windows service that depends on the minifilter
  * Installer - to make the installation easier (creation of the two predict and minifilter services and their registry keys)
  * RustWinToast - a basic exe to toast notifications
* Driver components:
  * Owlyshield Minifilter - the driver (user space), intercepts i/o operations and processes creations that will be used by *Owlyshield Predict*. The minifilter is also responsible for killing suspect processes families
* Deep Learning:
  * Keras script used to train the model and create the tflite file used by *Owlyshield Predict*


## Build the Minifilter

Build the minifilter may be tough. It requires a lot of dependencies and Visual Studio configuration. As it is not a component we update regularly, you may prefer to use the files we provide in the [GitHub Releases section](https://github.com/SitinCloud/Owlyshield/releases).

This being said, we provide the instructions to build it yourself. What follows happens in `owlyshield_minifilter`


### Prerequisites

1. Visual Studio version 2019 (2017 and 2022 may work but we did not test it),
2. Windows Driver Kit (WDK)
3. Windows SDK
4. Visual studio build tools 1.4.2 or newer.
5. C++/CLI support for Visual Studio build tools 1.4.2 or newer.

### Building

1. Clone or download this project and load RWatch.sln with Visual Studio,
2. Make sure that the configuration manager is set to x64,
3. Build the solution with the *Debug* configuration (the installer searches for the .inf and .sys files in Debug\).


## Build Rust components

### Owlyshield-Predict

#### Building

First, cd to `owlyshield_predict`.

By default, the installer fetches the Windows Service executable in Target\Release:

```
cargo build --release --features service
```

#### Running

Alternatively, you may prefer to build it as a console app for debug console. In that case, just use cargo as usual, for example with `cargo run`. In that case, **Make sure to manually copy moonlitefire-tflite/lib/tensorflow_lite_c.dll in target/debug and target/release, near to your generated .exe file.**


### WinRustToast

First, cd to `rust_win_toast`.

By default, the installer fetches the Windows Service executable in Target\Release:

```
cargo build --release
```

Please note toasts only work when *owlyshield-predict* is built as a Windows Service, and not as a console application.

## Compile the installer

1. Open *owlyshield-ransom-community.iss* in InnoSetup
2. Compile the installer. This builds *owlyshield-ransom-community.exe* (or run it from InnoSetup).

Please notice: 
* The *Owlyshield Predict* executable is retrieved from */target/release*
* The *rust_win_toast* executable is retrieved from */target/release*
* The *Owlyshield Minifiter* sys, cat and inf files are retrieved from */x64/Debug/FsFilter*


## Running

The Windows Service `Owlyshield Service` has been created. It defines a dependency on `OwlyshieldRansomFilter`.

If you prefer to use `owlyshield-predict` as a console app, you may have to start the minifilter with `sc start owlyshieldransomfilter`.

Don't forget to [Disable "Driver Signature Enforcement"](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/test-signing) at Windows startup. This is only required if you did not [get a copy](mailto:register@sitincloud) of the driver signed by Microsoft for [SitinCloud](https://wwww.sitincloud.com) (we provide it for free if you are a contributor).
