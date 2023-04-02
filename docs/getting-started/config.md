# Configuration

## Linux Configuration

On Linux, Owlyshield employs a TOML configuration file, located at `/etc/owlyshield/owlyshield.conf`, which defines the following parameters:


| Parameter | Description |
| --- | --- |
| process_activity_path | Directory containing prediction.csv used for debug. |
| kill_policy | Policy for handling the termination of the Owlyshield process: `SUSPEND`, `KILL`, or `DO_NOTHING`. |
| telemetry | `1` if telemetry is active, `0` if not. |
| mqtt_server | MQTT server address (if compilation feature enabled). |
| novelty_path | Path to novelty detection model (if compilation feature enabled). |

Here is an example of such a linux configuration file:

```toml
[Owlyshield]
debug_path = /home/fedora/owlyshield/debug
kill_policy = DO_NOTHING
log_path = /var/log/owlyshield/owlyshield.log
telemetry = 1
utils_path = /usr/local/owlyshield/utils
mqtt_server = MQTT_BROKER_IP
```


## Windows Configuration

Windows configurations are stored in the registry, at `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Owlyshield`. They are automatically created by the MSI installer.

| Parameter | Description |
| --- | --- |
| CONFIG_PATH | Directory containing incidents reports and exclusions list. |
| NUM_VERSION | Version number. |
| PROCESS_ACTIVITY_PATH | Directory containing prediction.csv used for debug. |
| UTILS_PATH | Directory that containes Windows utilities. |
| APP_ID | AppUserModelID for toast notifications (Windows only). |
| KILL_POLICY | Policy for handling the termination of the Owlyshield process: `SUSPEND`, `KILL`, or `DoNothing`. |
| LANGUAGE | Language used at installation. |
| TELEMETRY | `1` if telemetry is active, `0` if not. |
| MQTT_SERVER | MQTT server address (if compilation feature enabled). |
| NOVELTY_PATH | Path to novelty detection model (if compilation feature enabled). |


Also, logs are written to the windows event logs, that can be read with the *Event Viewer*.

