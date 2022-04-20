{
  description = "Serverless shortlinking service";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    devshell.url = "github:numtide/devshell";
    utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
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
              command = "wrangler publish --env prod";
              help = "Publish worker to CloudFlare";
            }
          ];

          packages = with pkgs; [ wrangler nodePackages.pnpm nodejs-17_x ];
        };
      });
}
