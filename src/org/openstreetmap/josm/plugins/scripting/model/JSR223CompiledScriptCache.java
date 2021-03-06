package org.openstreetmap.josm.plugins.scripting.model;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Logger;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.ScriptException;
import javax.validation.constraints.NotNull;

/**
 * <p><strong>CompiledScriptCache</strong> maintains a cache of compiled
 * scripts for script languages which are compiled before executed.</p>
 *
 */
public class JSR223CompiledScriptCache {
    @SuppressWarnings("unused")
    static private final Logger logger = Logger.getLogger(
            JSR223CompiledScriptCache.class.getName());

    private static final JSR223CompiledScriptCache instance =
            new JSR223CompiledScriptCache();

    /**
     * <p>Replies the global cache instance</p>
     * @return the cache
     */
    public static JSR223CompiledScriptCache getInstance() {
        return instance;
    }

    static private  class CacheEntry {
        private File file;
        private CompiledScript script;
        private long timestamp;

        public CacheEntry(File file, CompiledScript script) {
            this.timestamp = file.lastModified();
            this.file = file;
            this.script = script;
        }

        public File getFile() {
            return file;
        }

        public CompiledScript getScript() {
            return script;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }

    private final Map<File, CacheEntry> cache = new HashMap<>();

    public JSR223CompiledScriptCache() {}

    /**
     * <p>Compiles a script using {@code compiler} and replies the compiled
     * script. Looks up compiled scripts in an internal cache.</p>
     *
     * @param compiler the compiler. Must not be null.
     * @param scriptFile the script file. Must not be null.
     * @return the compiled script
     * @throws ScriptException thrown if compiling fails
     * @throws IOException thrown if IO with the script file fails
     */
    public CompiledScript compile(@NotNull Compilable compiler,
            @NotNull File scriptFile)
            throws ScriptException, IOException {
        Objects.requireNonNull(scriptFile);
        Objects.requireNonNull(compiler);
        CacheEntry entry = cache.get(scriptFile);
        if (entry != null && entry.getTimestamp() >= scriptFile.lastModified()){
            return entry.getScript();
        }
        try (FileReader reader = new FileReader(scriptFile)){
            CompiledScript script = compiler.compile(reader);
            entry = new CacheEntry(scriptFile, script);
            cache.put(scriptFile, entry);
            return script;
        }
    }
}
