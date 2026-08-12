import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Secure SSH Fundamentals | CM Regmi Docs",
  description:
    "Master secure SSH fundamentals: ed25519 key-based authentication, ssh-agent, strict file permissions, sshd hardening, disabling password auth, two-factor, jump hosts, auth log monitoring, and key rotation.",
  alternates: {
    canonical: `${SITE_URL}/docs/secure-ssh-basics`,
  },
  openGraph: {
    title: "Secure SSH Fundamentals | CM Regmi Docs",
    description:
      "A practical field guide to locking down OpenSSH: ed25519 keys, ssh-agent, sshd hardening, two-factor, jump hosts, auth log monitoring, and key rotation.",
    url: `${SITE_URL}/docs/secure-ssh-basics`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure SSH Fundamentals | CM Regmi Docs",
    description:
      "A practical field guide to locking down OpenSSH: ed25519 keys, ssh-agent, sshd hardening, two-factor, jump hosts, auth log monitoring, and key rotation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SecureSshBasics() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/secure-ssh-basics#article`,
    headline: "Secure SSH Fundamentals",
    description:
      "Master secure SSH fundamentals: ed25519 key-based authentication, ssh-agent, strict file permissions, sshd hardening, disabling password auth, two-factor, jump hosts, auth log monitoring, and key rotation.",
    url: `${SITE_URL}/docs/secure-ssh-basics`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="secure-ssh-basics-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Secure SSH Fundamentals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Remote Access Security
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Secure SSH Fundamentals
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Secure Shell, or SSH, is the standard protocol for administering remote Linux and Unix
              servers, and it is also one of the most heavily attacked services on the internet. A
              server that accepts password logins over SSH is effectively a public brute-force
              target, because automated scanners try thousands of username and password combinations
              every single day. This guide walks through the fundamentals of securing SSH end to
              end: cryptographic key authentication, the ed25519 algorithm, ssh-agent, strict file
              permissions, sshd hardening directives, disabling password authentication, two-factor
              verification, jump hosts, authentication log monitoring, and key rotation.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Why Password-Based SSH Authentication Is Unsafe
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every server that exposes SSH on the public internet receives constant automated
              probes. Attackers run dictionaries of common usernames such as root, admin, ubuntu,
              and deploy, paired with tens of thousands of weak passwords. On a default
              installation, a small VPS can collect hundreds of failed login attempts within an hour
              of coming online. Password authentication fails for a simple reason: passwords are
              guessable, reusable, and often shared across machines. Even a long password can be
              captured by a keylogger on an infected client, replayed in a phishing attempt, or
              leaked from a breached database if the same credential is reused elsewhere.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Brute force is rarely the only threat. Because a password crosses the network to reach
              the server, an attacker who has already compromised the network path, or who controls
              a malicious server in the middle, can observe it. The practical answer is not a longer
              password. It is to remove the password from the equation entirely and authenticate
              with a cryptographic key that never leaves your machine.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Key-Based Authentication: The Foundation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              SSH key-based authentication replaces the shared secret of a password with a public
              and private key pair. The private key stays on your workstation and never crosses the
              network. The public key is installed on every server you manage, normally inside the
              ~/.ssh/authorized_keys file of the account you log in as. When you connect, the server
              sends a challenge that can only be answered by the machine holding the private key.
              The server verifies the answer using the public key, and if it matches, the login
              proceeds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The private key is never transmitted, so an eavesdropper on the wire captures nothing
              useful. The private key is protected by a passphrase, so a stolen laptop or a
              compromised backup does not immediately grant access. If a public key leaks, the
              impact is limited to the servers where that key is installed, unlike a reused password
              that can unlock an entire estate. The same public key can be distributed to many
              servers, and a single compromised server no longer exposes credentials that work
              everywhere else. This is the model every modern SSH deployment should use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Why Ed25519 Is the Right Key Type
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Modern OpenSSH supports several key algorithms, and Ed25519 is the best default for
              new deployments today. It uses the EdDSA signature scheme on the Curve25519 elliptic
              curve, producing a compact 256-bit key that is fast to generate and verify, resistant
              to side-channel attacks, and immune to the weak randomness problems that occasionally
              plagued older RSA implementations. Compared with a 3072-bit or 4096-bit RSA key, the
              Ed25519 public key fits in a single line, login handshakes are faster, and the
              security margin is strong even with the smaller key size.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ed25519 signing is also deterministic, which means it does not need an entropy source
              at signing time, an advantage on embedded devices and in virtualized environments.
              Some older clients and enterprise appliances still require RSA, and OpenSSH continues
              to support it. In those cases, generate RSA keys with at least 3072 bits and never
              below 2048. For anything you control end to end, though, ed25519 is the recommended
              algorithm. To confirm your client supports it, run ssh -V and check that the version
              is at least 6.5.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Generating and Deploying Keys</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start on your workstation, not on the server. Generate the key pair with ssh-keygen
              and choose a strong passphrase when prompted. The -a 100 flag raises the key
              derivation cost, making it substantially harder to brute force the passphrase if the
              private key file is ever stolen. The -C comment records your identity and device so
              you can recognize the key later.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Generate an ed25519 key pair with a strong passphrase
ssh-keygen -t ed25519 -a 100 -C "alice@example.com (workstation)"

# Copy the public key to a server and install it in authorized_keys
ssh-copy-id -i ~/.ssh/id_ed25519.pub alice@server.example.com

# Manual alternative when ssh-copy-id is not available
cat ~/.ssh/id_ed25519.pub | ssh alice@server.example.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The command produces two files: ~/.ssh/id_ed25519, the private key that must never be
              shared, and ~/.ssh/id_ed25519.pub, the public key that is safe to install anywhere.
              Deploy the public key with ssh-copy-id, which appends it to the remote account
              authorized_keys file and sets the correct permissions automatically. The manual
              alternative pipes the public key through an SSH command; it works because the pipe
              carries only the public key, which is not a secret.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Protecting Key Files with Correct Permissions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              OpenSSH is strict about permissions, and it refuses to use a private key that is
              readable by anyone else. The correct baseline is 700 on the .ssh directory, 600 on the
              private key, and 600 on the authorized_keys file. If the ownership or mode is wrong,
              SSH prints a warning or skips the key entirely, and you either fall back to another
              method or fail to connect.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Apply strict permissions on the client machine
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# The same rules apply on the server for the service account home
chmod 700 /home/alice/.ssh
chmod 600 /home/alice/.ssh/authorized_keys`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The 700 on the directory stops other local users from listing your key names, the 600
              on the private key ensures only your account can read it, and the 600 on
              authorized_keys prevents a second local user from appending their own public key to
              hijack your account. Modern distributions reject group-readable keys outright, so if
              you share a machine, keep the group and other bits clear.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Managing Passphrases with ssh-agent
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Requiring a passphrase on every login is painful, and removing the passphrase defeats
              the purpose of the key. The ssh-agent solves this tension: it loads the unlocked
              private key into memory once, and then SSH client connections ask the agent to sign
              challenges on your behalf. The agent runs as a background process on your workstation,
              holding the decrypted key only in memory and only for a bounded lifetime.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Start the agent and load the key once
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Limit how long the key stays loaded (8 hours for a workday)
ssh-add -t 8h ~/.ssh/id_ed25519

# List the keys the agent currently holds
ssh-add -l`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Use -t to cap how long a key stays loaded; eight hours is a reasonable default. The
              agent socket is protected by the same Unix permissions as the rest of your session,
              and the passphrase still protects the key at rest on disk. Agent forwarding is
              different from local agent use: forwarding exposes your agent socket to a remote host,
              and any account that can read that socket can use your loaded keys to log in
              elsewhere. Prefer ProxyJump over agent forwarding for multi-hop chains, because the
              agent stays on your workstation instead of being exposed on an intermediate server. If
              you must forward the agent to a specific host, enable AllowAgentForwarding yes for
              that host only, scoped inside a Match block.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Hardening the sshd Configuration
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The server-side daemon, sshd, reads /etc/ssh/sshd_config. The directives below form a
              solid baseline. Always validate a config change with sshd -t before restarting the
              service, and never close an existing session until you have confirmed a fresh one
              still works, otherwise a typo can lock you out.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/ssh/sshd_config — hardening directives
Port 22
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
PermitEmptyPasswords no
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no
AllowAgentForwarding no
AllowTcpForwarding no
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers alice deploy`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              PermitRootLogin no removes the highest-value target on the system. MaxAuthTries 3
              limits key and password attempts per connection, and LoginGraceTime 30 caps the time
              allowed for authentication. ClientAliveInterval with ClientAliveCountMax detects dead
              connections so idle sessions do not linger. Disabling X11 and TCP forwarding shrinks
              the attack surface, and AllowUsers restricts logins to the named accounts. After
              editing, run sshd -t, then restart the daemon, which on a systemd distribution is sudo
              systemctl restart ssh. Match blocks let you apply stricter settings per user or per
              source subnet, which is where this hardening pairs naturally with jump host design.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Disabling Password Authentication
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Password authentication is the single largest exposure on an SSH server, and turning
              it off is the decisive hardening step. With PasswordAuthentication no, sshd rejects
              every password attempt before it reaches the account system, and automated brute-force
              scanners burn their attempts for nothing. Before you flip the switch, confirm three
              things: every account that needs SSH access has at least one working public key, you
              can reach the console or an out-of-band management interface in case something breaks,
              and you have tested a fresh key-based login after the change.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Set PasswordAuthentication no together with KbdInteractiveAuthentication no, because
              keyboard-interactive is a separate path that can re-enable password prompts through
              PAM. Restart sshd and verify that key-based login still works from a brand new session
              before you disconnect your current one. After that, watch the logs: the noise of
              failed password attempts should disappear almost immediately, which is both a safety
              improvement and a useful sign that nothing else is silently accepting passwords.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Adding a Second Factor with TOTP
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A key proves possession of a file. Adding a time-based one-time password, or TOTP,
              proves knowledge of a secret as well, turning SSH into two-factor authentication. The
              standard server-side tool is the Google Authenticator PAM module, which works with any
              TOTP app on your phone.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Install and configure the TOTP module on the server
sudo apt install libpam-google-authenticator
google-authenticator

# /etc/pam.d/sshd — insert at the top of the file
auth required pam_google_authenticator.so

# /etc/ssh/sshd_config — enable the keyboard-interactive path
KbdInteractiveAuthentication yes
AuthenticationMethods publickey,keyboard-interactive:pam`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              When you run google-authenticator it prints a QR code and a set of emergency scratch
              codes. Store the scratch codes somewhere safe; they are the only way in if you lose
              the phone. After the change, logins require your key and the six-digit code from the
              authenticator app. Because AuthenticationMethods lists publickey first, the key is
              always required, so a leaked TOTP code alone is not enough. Use this on bastion hosts
              and on any server holding sensitive data. The TOTP secret is stored per account on the
              server, so record the enrollment details in your vault so a lost phone does not lock
              your team out.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Jump Hosts and Bastion Access</h2>
            <p className="text-muted-foreground leading-relaxed">
              Not every server needs to be directly reachable from the internet. The bastion, or
              jump host, model places one hardened entry point in front of your private network.
              Operators connect to the bastion and hop from there to internal machines, which have
              no public address at all. This shrinks the exposed surface to a single host you can
              lock down, monitor, and audit intensively.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Connect through a bastion in a single command
ssh -J alice@jump.example.com alice@10.0.5.22

# Or declare the hop in ~/.ssh/config so it is automatic
Host db-internal
  HostName 10.0.5.22
  User alice
  ProxyJump alice@jump.example.com`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The -J flag chains the connections without ever storing your private key on the
              intermediate host, which is the key security property: your key material never touches
              the bastion disk, so compromising the bastion does not compromise your keys. In the
              config example, the ProxyJump directive makes the hop automatic and keeps the jump
              host, port, and username out of your daily commands. Combine the bastion with the sshd
              hardening from earlier and require two-factor on the bastion, and you get genuine
              defense in depth. For how to size and segment the tiers that carry your SSH traffic,
              see the{" "}
              <Link
                href="/docs/network-architecture-optimization"
                className="text-primary hover:underline"
              >
                network architecture and optimization guide
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              11. Monitoring Authentication Logs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Security controls are only as good as the visibility you keep over them. SSH writes an
              audit trail of every authentication attempt, and monitoring it catches brute-force
              runs, key misuse, and unexpected logins long before they become incidents. On systemd
              distributions the events land in the journal, while Debian and Ubuntu systems keep the
              classic /var/log/auth.log and RHEL-family systems use /var/log/secure.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Follow authentication events live on systemd distributions
sudo journalctl -u ssh -f

# Search for failed password attempts
sudo journalctl -u ssh | grep "Failed password"

# Rank the top source addresses of failed attempts
sudo grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -20`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              In the last command, the awk field expression extracts the source address from each
              failed password line, and sort with uniq -c converts the raw stream into a ranked list
              of attackers. Watch for a single address hammering many usernames, logins at unusual
              hours, and successful logins from addresses you do not recognize. Tools such as
              fail2ban can temporarily ban repeat offenders, but treat them as a supplement rather
              than a foundation: with password authentication disabled, most of the noise disappears
              anyway. For centralized logging, service alerts, and the full monitoring stack around
              these servers, see the{" "}
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="text-primary hover:underline"
              >
                infrastructure administration and monitoring guide
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">12. Rotating Keys on a Schedule</h2>
            <p className="text-muted-foreground leading-relaxed">
              Keys are credentials, and credentials need a lifecycle. A key that was handed to a
              consultant, typed onto a shared machine, or left on a decommissioned laptop is an open
              door. Set a rotation cadence, typically every 90 days for access keys, and rotate
              immediately when someone leaves the team, a laptop is lost, or a key file may have
              been exposed.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Generate a fresh key pair for the rotation cycle
ssh-keygen -t ed25519 -a 100 -C "alice@example.com rotation-2026-07"

# Stage the new public key on each server
ssh-copy-id -i ~/.ssh/id_ed25519_rotation.pub alice@server.example.com

# Verify the new key works before retiring the old one
ssh -i ~/.ssh/id_ed25519_rotation alice@server.example.com`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The rotation workflow is: generate a new key, stage the public key on each server,
              verify it works, and then remove the old public key from authorized_keys on every
              machine. Do not skip the removal step. A retired key that stays installed is worse
              than no rotation at all, because nobody tracks it anymore. Keep a key inventory that
              records each key comment, owner, and which servers it is installed on. The comment
              field in ssh-keygen exists for exactly this, and ssh-keygen -l -f
              ~/.ssh/id_ed25519.pub prints the fingerprint and comment so you can audit what is
              actually installed on a given server.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              13. Troubleshooting Common SSH Failures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Even with the fundamentals in place, SSH occasionally refuses to cooperate. These are
              the most common failures and how to resolve them.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong>Permission denied (publickey).</strong> The client could not authenticate
                with any key. Confirm the public key is in the remote authorized_keys file, point at
                the correct private key with -i, verify permissions are 600 on the key and 700 on
                the .ssh directory, and run ssh -v to see exactly which keys were offered and why
                they were rejected.
              </li>
              <li>
                <strong>Warning: remote host identification has changed.</strong> The server host
                key differs from the one stored in ~/.ssh/known_hosts. This can indicate a
                man-in-the-middle, or simply a reinstalled server. Verify the new fingerprint out of
                band, then clear the stale entry with ssh-keygen -R hostname.
              </li>
              <li>
                <strong>Connection refused.</strong> sshd is not listening or a firewall is blocking
                the port. Check the service status, confirm the Port directive in sshd_config, and
                inspect the firewall rules for that port.
              </li>
              <li>
                <strong>Too many authentication failures.</strong> The client is offering many keys
                and hits the MaxAuthTries limit. Use ssh -i to specify the exact key, or set
                IdentitiesOnly yes for that host in the SSH config.
              </li>
              <li>
                <strong>Bad owner or permissions.</strong> OpenSSH refuses keys with permissive
                modes. Fix the modes with chmod 600 on the private key and chmod 700 on the .ssh
                directory.
              </li>
              <li>
                <strong>Host key verification failed.</strong> This is the first connection to a
                brand new host, or the host key genuinely changed. Confirm you trust the host, then
                accept the new key or clear the stored one deliberately.
              </li>
              <li>
                <strong>Connection timed out.</strong> The network path is blocked, which is common
                for internal hosts reached through a bastion. Verify the jump host is reachable and
                that ProxyJump is spelled correctly in the config.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Q: Is ed25519 supported by all SSH servers?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A: OpenSSH 6.5 and later support it, which covers essentially all modern Linux and
                macOS servers. Some older enterprise appliances still require RSA; use a 3072-bit or
                4096-bit RSA key in those environments.
              </p>
              <h3 className="text-lg font-bold">Q: Can I reuse the same key on many servers?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A: Yes, that is normal and efficient. A single public key can be installed on any
                number of servers while the private key stays on your workstation. Protect it with a
                passphrase and rotate it on schedule so a lost device does not expose the whole
                fleet.
              </p>
              <h3 className="text-lg font-bold">
                Q: Do I still need a firewall if passwords are disabled?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A: Yes. Disabling passwords removes one attack vector, but sshd still parses
                untrusted network input, so exposing the port widely is unnecessary risk. Limit
                source addresses with a firewall or network ACLs, and keep private hosts behind a
                bastion.
              </p>
              <h3 className="text-lg font-bold">
                Q: What happens if I lose my private key or its passphrase?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A: There is no recovery path; the key is the credential. That is why key management
                matters. Keep a backup of the private key in a password manager or encrypted vault,
                store the TOTP scratch codes, and stage a replacement key before retiring the old
                one.
              </p>
              <h3 className="text-lg font-bold">Q: Should I change the SSH port away from 22?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A: Changing the port reduces automated scanning noise but is not a security control,
                because port scanners find any open port. Keep it at 22 or move it, but never rely
                on obscurity. The real defenses are key-only authentication, two-factor, and strict
                access control.
              </p>
              <h3 className="text-lg font-bold">
                Q: What is the difference between a passphrase and a password?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A: A password is a shared secret that must travel to a server. A passphrase protects
                a private key and never leaves your machine; it only decrypts the key locally. That
                is why a strong passphrase on a strong key beats a strong password in every SSH
                scenario.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Related Reading</h2>
            <p className="text-muted-foreground leading-relaxed">
              Continue with these adjacent guides. The{" "}
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="text-primary hover:underline"
              >
                infrastructure administration and service monitoring guide
              </Link>{" "}
              covers the centralized logging, service alerts, and runbooks you layer on top of the
              servers hardened here, and the{" "}
              <Link
                href="/docs/network-architecture-optimization"
                className="text-primary hover:underline"
              >
                network architecture and optimization guide
              </Link>{" "}
              covers segmenting network tiers and tuning the links that carry your SSH and
              management traffic.
            </p>
          </section>

          <AdsSlot />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
