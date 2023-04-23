{
  description = "Serverless shortlinking service";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    devshell.url = "github:numtide/devshell";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, devshell, utils, ... }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ devshell.overlay ];
        };
      in {
        devShell = pkgs.devshell.mkShell {
          name = "mark-devshell";

          commands = [
            {
              name = "develop";
              command = "wrangler dev";
              help = "Start a local server for developing worker";
            }
            {
              name = "publish";
              command = "wrangler publish";
              help = "Publish worker to CloudFlare";
            }
            {
              name = "secrets";
              command = "op inject -i $PRJ_ROOT/wrangler.toml.tpl -o $PRJ_ROOT/wrangler.toml";
              help = "Inject secrets from 1Password into wrangler.toml";
            }
          ];

          packages = with pkgs; [ wrangler nodePackages.pnpm nodejs_latest ];
        };
      });
}
