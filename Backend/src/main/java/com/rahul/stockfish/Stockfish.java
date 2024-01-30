package com.rahul.stockfish;

import org.springframework.util.ResourceUtils;

import java.io.*;

/**
 * A simple and efficient client to run Stockfish from Java
 *
 * @author Rahul A R
 * <p>
 * Quelle: https://github.com/rahular/chess-misc/blob/master/JavaStockfish/src/com/rahul/stockfish/Stockfish.java
 * http://www.rahular.com/stockfish-port-for-java/
 */
public class
Stockfish {

    private Process engineProcess;
    private BufferedReader processReader;
    private OutputStreamWriter processWriter;

    /**
     * Starts Stockfish engine as a process and initializes it
     *
     * @return True on success. False otherwise
     */
    public boolean startEngine() {
        try {
            String os = System.getProperty("os.name");

            //Check if Windows or Ubuntu OS
            if (os.contains("Windows") || os.contains("windows")) {
                //Windows
                engineProcess = Runtime.getRuntime().exec(ResourceUtils.getFile("classpath:stockfish/stockfish-windows-x86-64-avx2.exe").getAbsolutePath());
                processReader = new BufferedReader(new InputStreamReader(
                        engineProcess.getInputStream()));
                processWriter = new OutputStreamWriter(
                        engineProcess.getOutputStream());
            } else {
                //Ubuntu
//				engineProcess = Runtime.getRuntime().exec(new String[]{"/bin/bash", "-c", "stockfish"});
                //"/bin/bash -c" + ResourceUtils.getFile("classpath:stockfish/stockfish-ubuntu-x86-64-modern").getAbsolutePath());

                String stockfishPath = "/usr/app/stockfish-ubuntu-x86-64-modern";
                engineProcess = Runtime.getRuntime().exec(stockfishPath);
                System.out.println("engine process is: " + engineProcess);
                processReader = new BufferedReader(new InputStreamReader(
                        engineProcess.getInputStream()));
                processWriter = new OutputStreamWriter(
                        engineProcess.getOutputStream());
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while starting Stockfish engine");
        }
        return true;
    }

    /**
     * Takes in any valid UCI command and executes it
     *
     * @param command
     */
    public void sendCommand(String command) {
        try {
            processWriter.write(command + "\n");
            processWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * This is generally called right after 'sendCommand' for getting the raw
     * output from Stockfish
     *
     * @param waitTime Time in milliseconds for which the function waits before
     *                 reading the output. Useful when a long running command is
     *                 executed
     * @return Raw output from Stockfish
     */
    public String getOutput(int waitTime) {
        StringBuffer buffer = new StringBuffer();
        try {
            Thread.sleep(waitTime);
            sendCommand("isready");
            while (true) {
                String text = processReader.readLine();
                if (text.equals("readyok"))
                    break;
                else
                    buffer.append(text + "\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return buffer.toString();
    }

    /**
     * This function returns the best move for a given position after
     * calculating for 'waitTime' ms
     *
     * @param fen      Position string
     * @param waitTime in milliseconds
     * @return Best Move in PGN format
     */
    public String getBestMove(String fen, int waitTime) {
        sendCommand("position fen " + fen);
        sendCommand("go depth 10");
        String output = getOutput(waitTime + 20);
        System.out.println("getbestmove vor index" + output);
        return output.split("bestmove ")[1].split(" ")[0].replace("\n", "");
    }

    public String getBestMoveWithDepth(String fen, int waitTime, String depth) {
        String temp = "go depth " + depth;
        sendCommand("position fen " + fen);
        sendCommand(temp);
        String output = getOutput(waitTime + 20);
        System.out.println("with depth before index" + output);
        return output.split("bestmove ")[1].split(" ")[0].replace("\n", "");
    }

    public String getFENAfterPlayedMove(String startFen, String move) {
        sendCommand("position fen " + startFen + " moves " + move);
        sendCommand("d");
        String output = getOutput(20);
        return output.split("Fen:")[1].split("\n")[0];
    }

    /**
     * Stops Stockfish and cleans up before closing it
     */
    public void stopEngine() {
        try {
            sendCommand("quit");
            processReader.close();
            processWriter.close();
        } catch (IOException e) {
        }
    }

    /**
     * Get a list of all legal moves from the given position
     *
     * @param fen Position string
     * @return String of moves
     */
    public String getLegalMoves(String fen) {
        sendCommand("position fen " + fen);
        sendCommand("d");
        return getOutput(0).split("Legal moves: ")[0];
    }

    /**
     * Draws the current state of the chess board
     *
     * @param fen Position string
     */
    public void drawBoard(String fen) {
        sendCommand("position fen " + fen);
        sendCommand("d");

        String[] rows = getOutput(0).split("\n");

        for (int i = 1; i < 18; i++) {
            System.out.println(rows[i]);
        }
    }

    /**
     * Get the evaluation score of a given board position
     *
     * @param fen      Position string
     * @param waitTime in milliseconds
     * @return evalScore
     */
    public float getEvalScore(String fen, int waitTime) {
        sendCommand("position fen " + fen);
        sendCommand("go movetime " + waitTime);

        float evalScore = 0.0f;
        String[] dump = getOutput(waitTime + 20).split("\n");
        for (int i = dump.length - 1; i >= 0; i--) {
            if (dump[i].startsWith("info depth ")) {
                try {
                    evalScore = Float.parseFloat(dump[i].split("score cp ")[0]
                            .split(" nodes")[0]);
                } catch (Exception e) {
                    evalScore = Float.parseFloat(dump[i].split("score cp ")[0]
                            .split(" upperbound nodes")[0]);
                }
            }
        }
        return evalScore / 100;
    }
}
