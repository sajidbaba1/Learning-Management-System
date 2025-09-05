import java.net.*;
import java.io.*;
import java.nio.channels.*;
import java.util.Properties;

public class MavenWrapperDownloader {

    private static final String WRAPPER_VERSION = "0.5.6";
    private static final boolean VERBOSE = Boolean.parseBoolean(System.getenv("MVNW_VERBOSE"));

    public static void main(String[] args) {
        log("Apache Maven Wrapper Downloader " + WRAPPER_VERSION);

        if (args.length != 2) {
            System.err.println(" - ERROR wrapperUrl or wrapperJarPath parameter missing");
            System.exit(1);
        }

        try {
            log(" - Downloader started");
            URL wrapperUrl = new URL(args[0]);
            String jarPath = args[1].replace("\\", "/"); // Normalize path
            
            log(" - Downloading from: " + wrapperUrl);
            downloadFileFromURL(wrapperUrl, jarPath);
            log(" - Download completed");
            
        } catch (IOException e) {
            System.err.println(" - ERROR downloading: " + e.getMessage());
            System.exit(1);
        }
    }

    private static void downloadFileFromURL(URL wrapperUrl, String jarPath) throws IOException {
        ReadableByteChannel rbc = Channels.newChannel(wrapperUrl.openStream());
        FileOutputStream fos = new FileOutputStream(jarPath);
        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        fos.close();
        rbc.close();
    }

    private static void log(String msg) {
        if (VERBOSE) {
            System.out.println(msg);
        }
    }
}
