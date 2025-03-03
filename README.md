# 3suite-http-server

http-server is a standalone static web server, akin to `python -m http.server` or `node http-server`.

for configuration, see the [configuration file](./config.toml), and refer to the [3lib-config library docs](https://github.com/3sig/3lib-config)

### macOS builds

we currently do not support notarization for macOS builds.
to run mac builds, flag them as safe for gatekeeper with the following command:

`xattr -c <path_to_mac_executable>`
