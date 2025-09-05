#!/usr/bin/env sh

# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

# ----------------------------------------------------------------------------
# Maven Start Up Batch script
#
# Required ENV vars:
# JAVA_HOME - location of a JDK home dir
#
# Optional ENV vars
# MAVEN_BATCH_ECHO - set to 'on' to enable the echo of batch cmds
# MAVEN_BATCH_PAUSE - set to 'on' to wait for a keystroke before ending
# MAVEN_OPTS - parameters passed to the Java VM when running Maven
#     e.g. to debug Maven itself, use
#       set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
# MAVEN_SKIP_RC - flag to disable loading of mavenrc files
# ----------------------------------------------------------------------------

if [ -z "$MAVEN_SKIP_RC" ] ; then

    if [ -f /etc/mavenrc ] ; then
        . /etc/mavenrc
    fi

    if [ -f "$HOME/.mavenrc" ] ; then
        . "$HOME/.mavenrc"
    fi

fi

# OS specific support.  $var _must_ be set to either true or false.
cygwin=false
darwin=false
mingw=false
case "`uname`" in
  CYGWIN*) cygwin=true ;;
  MINGW*) mingw=true ;;
  Darwin*) darwin=true ;;
esac

if [ -z "$JAVA_HOME" ] ; then
    if [ -r /etc/gentoo-release ] ; then
        JAVA_HOME=`java-config --jre-home`
    fi
fi

if [ -z "$M2_HOME" ] ; then
    ## resolve links - $0 may be a link to maven's home
    PRG="$0"

    # need this for relative symlinks
    while [ -h "$PRG" ] ; do
        ls=`ls -ld "$PRG"`
        link=`expr "$ls" : '.*-> \(.*\)$'`
        if expr "$link" : '/.*' > /dev/null; then
            PRG="$link"
        else
            PRG="`dirname "$PRG"`/$link"
        fi
    done

    saveddir=`pwd`

    M2_HOME=`dirname "$PRG"`/..

    # make it fully qualified
    M2_HOME=`cd "$M2_HOME" && pwd`

    cd "$saveddir"
    # echo Using m2 at $M2_HOME
fi

# For Cygwin, ensure paths are in UNIX format before anything is touched
if $cygwin ; then
    [ -n "$M2_HOME" ] &&
        M2_HOME=`cygpath --unix "$M2_HOME"`
    [ -n "$JAVA_HOME" ] &&
        JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
    [ -n "$CLASSPATH" ] &&
        CLASSPATH=`cygpath --path --unix "$CLASSPATH"`
fi

# For Migwn, ensure paths are in UNIX format before anything is touched
if $mingw ; then
    [ -n "$M2_HOME" ] &&
        M2_HOME="`(cd "$M2_HOME"; pwd)`"
    [ -n "$JAVA_HOME" ] &&
        JAVA_HOME="`(cd "$JAVA_HOME"; pwd)`"
fi

if [ -z "$JAVA_HOME" ]; then
    javaExecutable="`which javac`"
    if [ -n "$javaExecutable" ] && ! [ "`expr \"$javaExecutable\" : '.*[^/]javac'`" -gt 0 ]; then
        # readlink(1) is not available as standard on Solaris 10.
        readLink=`which readlink`
        if [ ! `expr "$readLink" : '.*not found'` -gt 0 ]; then
            javaExecutable="`readlink -f "$javaExecutable"`"
        fi
        javaHome="`dirname "$javaExecutable"`"
        javaHome=`expr "$javaHome" : '\(.*\)/bin'`
        JAVA_HOME="$javaHome"
        export JAVA_HOME
    fi
fi

if [ -z "$JAVACMD" ] ; then
    if [ -n "$JAVA_HOME"  ] ; then
        if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
            # IBM's JDK on AIX uses strange locations for the executables
            JAVACMD="$JAVA_HOME/jre/sh/java"
        else
            JAVACMD="$JAVA_HOME/bin/java"
        fi
    else
        JAVACMD="`which java`"
    fi
fi

if [ ! -x "$JAVACMD" ] ; then
    echo "Error: JAVA_HOME is not defined correctly." 1>&2
    echo "  We cannot execute $JAVACMD" 1>&2
    exit 1
fi

if [ -z "$JAVA_HOME" ] ; then
    echo "Warning: JAVA_HOME environment variable is not set."
fi

CLASSWORLDS_LAUNCHER=org.codehaus.plexus.classworlds.launcher.Launcher

# traverses directory structure until process finds the maven-wrapper.properties file
# the wrapper jar file should be right next to it
MAVEN_PROJECTBASEDIR="$MAVEN_BASEDIR"
WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

if [ -z "$MAVEN_PROJECTBASEDIR" ] ; then
  MAVEN_PROJECTBASEDIR="`pwd`"
fi

while [ "$MAVEN_PROJECTBASEDIR" != "" -a ! -f "$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.properties" ]
do
  MAVEN_PROJECTBASEDIR="`dirname "$MAVEN_PROJECTBASEDIR"`"
done

WRAPPER_JAR="$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.jar"
WRAPPER_PROPS="$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.properties"

if [ -r "$WRAPPER_PROPS" ] ; then
    wrapperUrl=`sed '/^wrapperUrl=/!d;s/.*=//' "$WRAPPER_PROPS"`
fi

if [ -z "$wrapperUrl" ] ; then
    wrapperUrl="https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar"
fi

if [ ! -f "$WRAPPER_JAR" ]; then
    if [ "$MVNW_VERBOSE" = true ]; then
        echo "Downloading Maven Wrapper from $wrapperUrl ..."
    fi
    if command -v wget > /dev/null; then
        if [ "$MVNW_VERBOSE" = true ]; then
            wget -O "$WRAPPER_JAR" "$wrapperUrl"
        else
            wget -O "$WRAPPER_JAR" "$wrapperUrl" --quiet
        fi
    elif command -v curl > /dev/null; then
        if [ "$MVNW_VERBOSE" = true ]; then
            curl -o "$WRAPPER_JAR" "$wrapperUrl"
        else
            curl -o "$WRAPPER_JAR" -s "$wrapperUrl"
        fi
    else
        echo "Could not find wget or curl"
        exit 1
    fi
fi

# When on Windows, pass the user parameters in quotes ("$@")
# Otherwise, parameters are passed as-is ($@)
if $mingw || $cygwin; then
  MAVEN_CMD_LINE_ARGS="\"$@\""
else
  MAVEN_CMD_LINE_ARGS="$@"
fi

# Provide a "standardized" way to retrieve the CLI args that will
# work with both Windows and non-Windows executions.
MAVEN_OPTS="$MAVEN_OPTS -Dmaven.wrapper.params=$MAVEN_CMD_LINE_ARGS"

exec "$JAVACMD" \
  $MAVEN_OPTS \
  -classpath "$WRAPPER_JAR" \
  "-Dmaven.multiModuleProjectDirectory=$MAVEN_PROJECTBASEDIR" \
  $WRAPPER_LAUNCHER $MAVEN_CMD_LINE_ARGS
